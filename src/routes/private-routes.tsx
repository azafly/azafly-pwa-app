import { PropsWithChildren } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { useFirebaseAuthContext } from 'providers/auth/firebase';

export function PrivateRoute({
    children,
    ...rest
}: PropsWithChildren<any>) {
    const {
        authState: { isAuth }
    } = useFirebaseAuthContext();

    return (
        <Route
            {...rest}
            render={({ location }) => {
                return isAuth ? (
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
