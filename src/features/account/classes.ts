import { createStyles, makeStyles, Theme } from '@material-ui/core';
export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        user_account__root: {
            display: 'flex',
            maxWidth: 1020,
            margin: 'auto',
            alignItems: 'center',
            marginTop: '20vh',
            flexDirection: 'column',
            height: '100vh'
        },
        heading: {
            fontSize: 25,
            fontWeight: 900,
            textAlign: 'center',
            '& span': {
                borderBottom: '2px solid green'
            },
            '& a': {
                cursor: 'pointer',
                zIndex: 100000
            }
        },
        files: {
            margin: 'auto',
            '& a': {
                width: '90%',
                margin: 'auto',
                height: 300,
                borderRadius: 8
            }
        },
        form_container: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            margin: '3vh 5vw',
            '& .info': {
                color: '#4990A4'
            }
        },
        edit: {
            cursor: 'pointer',
            textAlign: 'center'
        },
        title: {
            alignSelf: 'flex-start',
            marginLeft: '10vw',
            marginBottom: 30,
            textDecoration: 'underline'
        },
        input: {
            borderRadius: 4,
            WebkitAppearance: 'none',
            border: 'none',
            width: '100%',
            padding: 10
        },
        picture: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: theme.colors.base,
            padding: '4rem',
            borderRadius: '50%',
            marginBottom: 10,
            opacity: 0.5,
            cursor: 'pointer'
        },
        kyc_title: {
            fontWeight: 800,
            marginBottom: 20
        },
        terms: {
            display: 'flex',
            fontSize: 12,
            fontWeight: 450,
            color: '#77838F'
        },
        checkBox: {
            width: 20,
            marginRight: 10,
            borderRadius: 10,
            margin: 10,
            cursor: 'pointer'
        },
        submit: {
            margin: 25
        },
        disable: {
            pointerEvents: 'none'
        },

        upload: {
            '& label': {
                cursor: 'pointer'
            },
            '& span': {
                fonWeight: 900
            }
        }
    })
);

export const useStepperStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            marginBottom: 100,
            display: 'flex',
            justifyContent: 'center',
            margin: 'auto',
            maxWidth: 1200,
            marginTop: '15vh',
            [theme.breakpoints.up('md')]: {
                width: 'calc(100vw - 10vw)',
                marginTop: '20vh'
            },
            [theme.breakpoints.down('sm')]: {
                marginTop: '15vh'
            },
            '& .MuiStepper-root': {
                background: 'inherit',
                borderRadius: 15
            },
            '& .MuiStepLabel-label': {
                cursor: 'pointer',
                fontWeight: 650,
                color: theme.colors.textPrimary
            }
        },
        stepperLabel: {},
        button: {
            marginTop: theme.spacing(1),
            marginRight: theme.spacing(3),
            textTransform: 'none',
            zIndex: 0,
            width: '18ch'
        },
        disabled: {
            opacity: 0.7,
            background: theme.colors.base
        },
        next: {
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            marginTop: theme.spacing(1),
            textTransform: 'none',
            background: theme.colors.base,
            width: '20ch',
            color: 'white',
            textDecoration: 'none',
            cursor: 'pointer',
            borderRadius: 6,
            border: 'none',
            '&:disabled': {
                opacity: 0.7,
                pointerEvents: 'none'
            }
        },
        price: {
            color: theme.colors.textPrimary,
            fontWeight: 900,
            fontSize: '1.5rem',
            borderBottom: 'none',
            flexGrow: 1
        },
        actionsContainer: {
            marginBottom: theme.spacing(2),
            maxWidth: 800,
            display: 'flex',
            justifyContent: 'space-around'
        },
        resetContainer: {
            padding: theme.spacing(3)
        },
        dashboard_link: {
            background: theme.colors.base,
            padding: '10px 20px',
            width: '20ch',
            cursor: 'pointer',
            marginTop: 20,
            display: 'block',
            textDecoration: 'none',
            color: 'white',
            borderRadius: 6
        }
    })
);
