import { PropsWithChildren } from 'react';
import { Route, Redirect } from 'react-router-dom';

export function PrivateRoute({ children, ...rest }: PropsWithChildren<any>) {
    const token = localStorage.getItem('token');

    return (
        <Route
            {...rest}
            render={({ location }) => {
                return token ? (
                    children
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
