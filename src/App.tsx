import { ApolloProvider } from '@apollo/client';
import { createTheme } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';
import { theme } from 'providers/theme';
import { ThemeProvider } from '@material-ui/core/styles';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import DateAdapter from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import { FirebaseAuthProvider } from 'providers/auth/firebase';
import { getPersistor } from '@rematch/persist';
import { PersistGate } from 'redux-persist/es/integration/react';
import { getApolloClient } from 'libs/apollo-client';
import { Dispatch, RootState } from 'app/store';
import { Routes } from 'routes';

import { ThreeDots } from './features/user-dashboard/loader-skeleton';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from 'providers/auth/firebase/firebase';

function App() {
    const { token, isAuth } = useSelector((state: RootState) => state.auth);
    const preferredTheme = useMemo(() => createTheme(theme), []);
    const dispatch = useDispatch<Dispatch>();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const client = useMemo(() => getApolloClient(token), [token, isAuth]);
    const reduxAuthState = useSelector((state: RootState) => state.auth);

    const redirectOnNoAuth = () => {
        return <Redirect to={'/signin'} />;
    };
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(firebaseAuth, async user => {
            if (!user) {
                firebaseAuth
                    .signOut()
                    .then(() => {
                        dispatch.auth.updateAuthState({
                            ...reduxAuthState,
                            isAuth: false,
                            user: null,
                            token: null,
                            isLoading: false,
                            isError: false
                        });
                        redirectOnNoAuth();
                    })
                    .catch(error => console.warn(error));
            }
        });

        return () => unsubscribe();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <ApolloProvider client={client}>
            <FirebaseAuthProvider>
                <LocalizationProvider dateAdapter={DateAdapter}>
                    {' '}
                    <ThemeProvider theme={preferredTheme}>
                        <CssBaseline />
                        <PersistGate loading={<ThreeDots />} persistor={getPersistor()}>
                            <Routes />
                        </PersistGate>
                    </ThemeProvider>
                </LocalizationProvider>
            </FirebaseAuthProvider>
        </ApolloProvider>
    );
}

export default App;
