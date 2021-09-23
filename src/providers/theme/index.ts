declare module '@material-ui/core/styles/createTheme' {
    interface Theme {
        colors: {
            base: string
            white: string
            textPrimary: string
        }
    }
    // allow configuration using `createMuiTheme`
    interface ThemeOptions {
        status?: {
            danger?: string;
        }
        colors: {
            base: string
            white: string
            textPrimary: string
        }
    }
}

export const theme = {
    palette: {
        primary: {
            main: '#4990A4',

        },
        secondary: {
            main: '#0D324D'
        },
        text: {
            primary: '#0d324d',
            secondary: '#333333',
            hint: '#4990a4'

        },
        background: {
            default: '#F7F8F9'
        },

    },
    colors: {
        base: '#4990a4',
        white: '#FFFFFF',
        textPrimary: '#0d324d',
    },
    typography: {
        fontFamily: [
            'Nunito',
            'sans-serif',
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    },
}

