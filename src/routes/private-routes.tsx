import { PropsWithChildren } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { NavBar } from 'components/nav-bar';
import { BottomNavBar } from 'features/user-dashboard/bottom-navbar';
import { RootState } from 'app/store';
import { useSelector } from 'react-redux';

export function PrivateRoute({ children, ...rest }: PropsWithChildren<any>) {
    const { isAuth } = useSelector((state: RootState) => state.auth);

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
                            pathname: '/signin',
                            state: { from: location }
                        }}
                    />
                );
            }}
        />
    );
}
