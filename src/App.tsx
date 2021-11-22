import { createTheme } from '@material-ui/core/styles';
import { theme } from 'providers/theme';
import { ThemeProvider } from '@material-ui/core/styles';
import { useMemo } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import DateAdapter from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import { Routes } from 'routes';

function App() {
    const preferredTheme = useMemo(() => createTheme(theme), []);

    return (
        <LocalizationProvider dateAdapter={DateAdapter}>
            {' '}
            <ThemeProvider theme={preferredTheme}>
                <CssBaseline />
                <Routes />
            </ThemeProvider>
        </LocalizationProvider>
    );
}

export default App;
