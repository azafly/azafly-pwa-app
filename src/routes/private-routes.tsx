import { PropsWithChildren } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { NavBar } from 'components/nav-bar';
import { BottomNavBar } from 'features/user-dashboard/bottom-navbar';

export function PrivateRoute({ children, ...rest }: PropsWithChildren<any>) {
    const token = localStorage.getItem('token');

    return (
        <Route
            {...rest}
            render={({ location }) => {
                return token ? (
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
