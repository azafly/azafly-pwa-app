import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const useSPaymentsStyles = makeStyles(() =>
    createStyles({
        root: {
            width: '100vw',
            overflowX: 'hidden'
        }
    })
);

export const useStepperStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: 'calc(100vw - 5vw)',
            maxWidth: 1020,
            margin: 'auto',
            marginBottom: 100,
            marginTop: '15vh',
            [theme.breakpoints.up('md')]: {
                width: 'calc(100vw - 20vw)',
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
