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
            margin: 'auto',
            marginBottom: 100,
            maxWidth: 1920,
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
            zIndex: 1,
            width: '18ch'
        },
        next: {
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            marginTop: theme.spacing(1),
            marginRight: theme.spacing(3),
            textTransform: 'none',
            background: theme.colors.base,
            padding: '14px 20px',
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
        actionsContainer: {
            marginBottom: theme.spacing(2),
            width: '100%',
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
