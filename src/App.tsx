import { ApolloProvider } from '@apollo/client';
import { createTheme } from '@material-ui/core/styles';
import { theme } from 'providers/theme';
import { ThemeProvider } from '@material-ui/core/styles';
import { useMemo } from 'react';
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
    const { token } = useSelector((state: RootState) => state.auth);
    const preferredTheme = useMemo(() => createTheme(theme), []);

    const client = getApolloClient(token);

    return (
        <PersistGate loading={<ThreeDots />} persistor={getPersistor()}>
            <FirebaseAuthProvider>
                <ApolloProvider client={client}>
                    <LocalizationProvider dateAdapter={DateAdapter}>
                        {' '}
                        <ThemeProvider theme={preferredTheme}>
                            <CssBaseline />
                            <Routes />
                        </ThemeProvider>
                    </LocalizationProvider>
                </ApolloProvider>
            </FirebaseAuthProvider>
        </PersistGate>
    );
}

export default App;
