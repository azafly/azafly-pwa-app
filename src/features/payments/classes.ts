import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';


export const useSPaymentsStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100vw',
            overflowX: 'hidden',
            background: theme.palette.background.default,

        },
    }),
);



export const useStepperStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: 'calc(100vw - 5vw)',
            margin: 'auto',
            marginTop: '20vh',
            marginBottom: 100,
            [theme.breakpoints.up('md')]: {
                width: 'calc(100vw - 20vw)',
            },
            '& .MuiStepper-root': {
                backgroundColor: '#F5F5F5',
                boxShadow: 'rgba(0, 0, 0, 0.05) 0px 30px 30px',
                borderRadius: 6,
            },
            '& .MuiStepLabel-label': {
                cursor: 'pointer',
                fontWeight: 650,
                color: theme.colors.black
            }
        },
        stepperLabel: {

        },
        button: {
            marginTop: theme.spacing(1),
            marginRight: theme.spacing(3),
            textTransform: 'none',
            width: 100,
        },
        actionsContainer: {
            marginBottom: theme.spacing(2),
        },
        resetContainer: {
            padding: theme.spacing(3),
        },
    }),
);
