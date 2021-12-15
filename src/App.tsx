import { ApolloProvider } from '@apollo/client';
import { createTheme } from '@material-ui/core/styles';
import { theme } from 'providers/theme';
import { ThemeProvider } from '@material-ui/core/styles';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import DateAdapter from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import { getApolloClient } from 'libs/apollo-client';
import { RootState } from 'app/store';
import { Routes } from 'routes';

function App() {
    const preferredTheme = useMemo(() => createTheme(theme), []);
    const { token } = useSelector((state: RootState) => state.auth);
    const client = useMemo(() => getApolloClient(token), [token]);

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
