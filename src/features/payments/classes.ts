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
            marginTop: '20vh',
            marginBottom: 100,
            boxShadow: 'rgb(0 27 71 / 16%) -20px -29px 90px -25px',
            [theme.breakpoints.up('md')]: {
                width: 'calc(100vw - 20vw)'
            },
            '& .MuiStepper-root': {
                boxShadow: 'rgb(0 27 71 / 16%) 0px 29px 32px -25px',
                borderRadius: 6
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
            width: 100
        },
        actionsContainer: {
            marginBottom: theme.spacing(2)
        },
        resetContainer: {
            padding: theme.spacing(3)
        }
    })
);
