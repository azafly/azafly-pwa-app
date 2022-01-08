import { ApolloProvider } from '@apollo/client';
import { createTheme } from '@material-ui/core/styles';
import { theme } from 'providers/theme';
import { ThemeProvider } from '@material-ui/core/styles';
import { useIdleTimer } from 'react-idle-timer';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import DateAdapter from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import { getApolloClient } from 'libs/apollo-client';
import { getPersistor } from '@rematch/persist';
import { PersistGate } from 'redux-persist/es/integration/react';
import { RootState } from 'app/store';
import { Routes } from 'routes';
import { useFirebaseAuthContext } from 'providers/auth/firebase';

import { ThreeDots } from 'components/css-loaders/three-dots';

function App() {
    const { token } = useSelector((state: RootState) => state.auth);
    const preferredTheme = useMemo(() => createTheme(theme), []);
    const { signout } = useFirebaseAuthContext();

    const client = getApolloClient(token);

    useIdleTimer({
        timeout: 1000 * 60 * 5,
        onIdle: () => signout(),
        crossTab: {
            emitOnAllTabs: true
        },
        debounce: 500
    });

    return (
        <ApolloProvider client={client}>
            <PersistGate loading={<ThreeDots />} persistor={getPersistor()}>
                <LocalizationProvider dateAdapter={DateAdapter}>
                    {' '}
                    <ThemeProvider theme={preferredTheme}>
                        <CssBaseline />
                        <Routes />
                    </ThemeProvider>
                </LocalizationProvider>
            </PersistGate>
        </ApolloProvider>
    );
}

export default App;
