import { PropsWithChildren } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { BottomNavBar } from 'features/user-dashboard/bottom-navbar';
import { useSelector } from 'react-redux';
import { RootState } from 'app/store';
import { ROUTE_MAP_ENUM } from 'routes/utils';

export function PrivateRoute({ children }: PropsWithChildren<any>) {
    const {
        auth: { isAuth }
    } = useSelector(({ auth }: RootState) => ({ auth }));

    const location = useLocation();

    if (!isAuth) {
        return <Navigate to={`${ROUTE_MAP_ENUM.AUTH}/signin`} state={{ from: location.pathname }} replace />;
    } else {
        return (
            <>
                {' '}
                {children} <BottomNavBar />{' '}
            </>
        );
    }
}
