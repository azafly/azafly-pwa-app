import { PropsWithChildren } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { NavBar } from 'components/nav-bar';
import { BottomNavBar } from 'features/user-dashboard/bottom-navbar';
import { useSelector } from 'react-redux';
import { RootState } from 'app/store';

export function PrivateRoute({ children, ...rest }: PropsWithChildren<any>) {
    const {
        auth: { isAuth }
    } = useSelector(({ auth }: RootState) => ({ auth }));

    return (
        <Route
            {...rest}
            render={({ location }) => {
                return isAuth ? (
                    <>
                        <NavBar />

                        {children}
                        <BottomNavBar />
                    </>
                ) : (
                    <Redirect
                        to={{
                            pathname: 'auth/signin',
                            state: { from: location }
                        }}
                    />
                );
            }}
        />
    );
}
