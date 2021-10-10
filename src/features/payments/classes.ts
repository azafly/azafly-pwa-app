import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const useSPaymentsStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100vw',
            overflowX: 'hidden',
            background: theme.palette.background.default
        }
    })
);

export const useStepperStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: 'calc(100vw - 5vw)',
            margin: 'auto',
            marginBottom: 100,
            marginTop: '15vh',
            boxShadow: 'rgb(0 27 71 / 16%) -20px -29px 90px -25px',
            [theme.breakpoints.up('md')]: {
                width: 'calc(100vw - 20vw)',
                marginTop: '20vh'
            },
            [theme.breakpoints.down('sm')]: {
                marginTop: '15vh'
            },
            '& .MuiStepper-root': {
                boxShadow: 'rgb(0 27 71/16%) 0px 29px 32px -25px',
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
            zIndex: 1,
            width: '18ch'
        },
        next: {
            marginTop: theme.spacing(1),
            marginRight: theme.spacing(3),
            background: theme.colors.base,
            padding: '14px 20px',
            width: '20ch',
            textDecoration: 'none',
            color: 'white',
            cursor: 'pointer',
            borderRadius: 6,
            border: 'none',
            '&:disabled': {
                opacity: 0.7,
                pointerEvents: 'none'
            }
        },
        actionsContainer: {
            marginBottom: theme.spacing(2)
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
