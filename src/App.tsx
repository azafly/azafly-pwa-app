import { ApolloProvider } from '@apollo/client';
import { createTheme } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';
import { theme } from 'providers/theme';
import { ThemeProvider } from '@material-ui/core/styles';
import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import DateAdapter from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import { FirebaseAuthProvider } from 'providers/auth/firebase';
import { getPersistor } from '@rematch/persist';
import { PersistGate } from 'redux-persist/es/integration/react';
import { getApolloClient } from 'libs/apollo-client';
import { RootState } from 'app/store';
import { Routes } from 'routes';

import { ThreeDots } from './features/user-dashboard/loader-skeleton';

function App() {
    const { token, isAuth } = useSelector((state: RootState) => state.auth);
    const preferredTheme = useMemo(() => createTheme(theme), []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const client = useMemo(() => getApolloClient(token), [token, isAuth]);

    useEffect(() => {
        const redirectOnNoAuth = () => {
            if (!isAuth) return <Redirect to={'/signin'} />;
        };

        redirectOnNoAuth();
    }, [isAuth]);

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
