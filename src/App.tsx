import { createTheme } from '@material-ui/core/styles';
import { getPersistor } from '@rematch/persist';
import { theme } from 'providers/theme';
import { ApolloProvider } from '@apollo/client';
import { ThemeProvider } from '@material-ui/core/styles';
import { useIdleTimer } from 'react-idle-timer';
import { useMemo, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import DateAdapter from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { PersistGate } from 'redux-persist/es/integration/react';
import { getApolloClient } from 'libs/apollo-client';

import { Routes } from 'routes';
import { ThreeDots } from 'components/css-loaders/three-dots';
import { useFirebaseAuthContext } from 'providers/auth/firebase';
import { getEnv, ENV } from 'format-env';

import usePWAInstallPrompt from 'hooks/use-prompt-pwa-install';
import VisitorAPI from 'visitorapi';

const IDLE_TIME = 1000 * 60 * parseInt(getEnv(ENV.REACT_APP_IDLE_TIME));

function App() {
    const preferredTheme = useMemo(() => createTheme(theme), []);

    const { signout } = useFirebaseAuthContext();

    useIdleTimer({
        timeout: IDLE_TIME,
        onIdle: () => signout(),
        crossTab: {
            emitOnAllTabs: true
        }
    });

    usePWAInstallPrompt({});
    const client = getApolloClient();

    useEffect(() => {
        VisitorAPI(
            '5T7E6zMLqLKoW8PuFg49',
            (data: any) => {
                console.log(data);
            },
            (error: any) => {
                console.log(error);
            }
        );
    }, []);

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
