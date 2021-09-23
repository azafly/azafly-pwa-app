import { createStyles, makeStyles, Theme } from '@material-ui/core'

export const useFormStyles = makeStyles((theme: Theme) =>
    createStyles({
        signInformRoot: {
            [theme.breakpoints.only('xs')]: {
                paddingTop: 0,
            }
        },
        alert: {
            margin: 15,
            overflowWrap: 'break-word',
        },
        heading: {
            fontSize: 45,
            marginTop: '20vh',
            marginBottom: 30,
            fontWeight: 900,
        },
        form_container: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
        },
        divider: {
            display: 'flex',
            alignItems: 'center',
            background: 'none',
            margin: '10px 0px',
            '& .line': {
                width: '50%',
                backgroundColor: 'rgb(212, 227, 235)',
                border: 'medium none',
                height: 1

            },
            '& .or': {
                padding: '0px 18px',
                color: 'rgb(175, 199, 209)',
                fontWeight: 400,
            }
        },
        facebook: {
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'rgb(0, 118, 251)',
            padding: 5,
            height: 40,
            color: 'white',
            fontWeight: 500,
            textTransform: 'none',
            fontSize: '0.875rem',
            borderRadius: 6,
            margin: '10px 0px',
            zIndex: 10000,
            textAlign: 'center',
            boxShadow: '0 2px 16px 0 rgba(0,0,0,0.08)',
            '& svg': {
                flexGrow: 0,
                width: 40,
                height: 40
            },
            '& .text': {
                margin: 'auto',
                textAlign: 'right',
                justifySelf: 'start'
            }
        },
        google: {
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            height: 40,
            backgroundColor: 'rgb(255, 255, 255)',
            padding: 5,
            color: theme.palette.text.primary,
            fontWeight: 500,
            textTransform: 'none',
            fontSize: '0.875rem',
            borderRadius: 6,
            margin: '10px 0px',
            zIndex: 10000,
            boxShadow: '0 2px 16px 0 rgba(0,0,0,0.08)',
            '& svg': {
                flexGrow: 0,
                width: 40,
                height: 40
            },
            '& .text': {
                margin: 'auto'

            }
        },
        submit: {
            background: theme.colors.base,
            borderRadius: 6,
            padding: 5,
            margin: '15px 0px',
            height: 30,
            textAlign: 'center',
            cursor: 'pointer',
            boxShadow: '0 2px 16px 0 rgba(0,0,0,0.08)',
            '&:hover': {
                background: '#4990a4',
                opacity: 0.9
            },
            '& button': {
                color: 'white',
                fontWeight: 500,
                textTransform: 'none',
            }
        },
        forgotPassword: {
            color: theme.colors.base,
            fontSize: '0.8rem',
            float: 'right',
            margin: '10px 0px',
            cursor: 'pointer',
            zIndex: 10000
        },
        input: {
            '& .MuiInput-formControl::before': {
                opacity: 0.7,
            },
            '& .MuiFormLabel-root': {
                opacity: 0.7,
                marginLeft: 15,
                fontSize: '0.8rem',
                [theme.breakpoints.down('md')]: {
                    marginLeft: 5,
                    fontSize: '0.7rem',
                }
            },
            [theme.breakpoints.down("sm")]: {
                flexDirection: 'column',
            },
        }
    }),

);

export const useForgotPasswordStyles = makeStyles((theme: Theme) =>
    createStyles({
        forgotPasswordRoot: {
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            height: '100vh',
            width: '100vw',
            position: 'relative',
            background: theme.palette.background.default,

        },
        alert: {
            margin: 15,
            overflowWrap: 'break-word',
        },
        heading: {
            fontSize: 45,
            marginTop: '20vh',
            marginBottom: 30,
            fontWeight: 900,
        },
        form_container: {
            display: 'flex',
            maxWidth: 600,
            width: 300,
            margin: 30,
            flexDirection: 'column',
            justifyContent: 'center',
        },
        input: {
            borderRadius: 4,
            WebkitAppearance: 'none',
            boxShadow: '0 2px 16px 0 rgba(0,0,0,0.08)',
            background: '#fff !important',
            border: 'none',
            padding: 20,
            margin: '10px 0px',
            height: 40,
        },
        submit: {
            background: theme.colors.base,
            borderRadius: 6,
            padding: '20px',
            margin: '15px 0px',
            height: 30,
            width: '100%',
            textAlign: 'center',
            textTransform: 'none',
            color: 'white',
            cursor: 'pointer',
            fontWeight: 500,
            boxShadow: '0 2px 16px 0 rgba(0,0,0,0.08)',
            '&:hover': {
                background: '#4990a4',
                opacity: 0.9
            },
        },
        underline: {
            '&::before': {
                borderBottom: 'none'
            }
        },
        loginLink: {
            color: theme.colors.base
        }
    })
);

export const useIllustrationStyles = makeStyles((theme: Theme) =>
    createStyles({
        onboarding_container_sign_in: {
        },
        signupSVG: {
            paddingBottom: 50,
            [theme.breakpoints.only('xs')]: {
                display: 'none',
                width: '100vw'
            }
        },
    }),

);