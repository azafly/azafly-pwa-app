import { ApolloProvider } from '@apollo/client';
import { createTheme } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';
import { theme } from 'providers/theme';
import { ThemeProvider } from '@material-ui/core/styles';
import { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import DateAdapter from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import { getApolloClient } from 'libs/apollo-client';
import { RootState } from 'app/store';
import { Routes } from 'routes';

function App() {
    const { token, isAuth } = useSelector((state: RootState) => state.auth);
    const preferredTheme = useMemo(() => createTheme(theme), []);
    const client = useMemo(() => getApolloClient(token), [token]);

    const redirectOnNoAuth = () => {
        if (!isAuth) return <Redirect to={'/signin'} />;
    };

    const redirectCallBack = useCallback(redirectOnNoAuth, [isAuth]);

    redirectCallBack();

    return (
        <ApolloProvider client={client}>
            <LocalizationProvider dateAdapter={DateAdapter}>
                {' '}
                <ThemeProvider theme={preferredTheme}>
                    <CssBaseline />
                    <Routes />
                </ThemeProvider>
            </LocalizationProvider>
        </ApolloProvider>
    );
}

export default App;
