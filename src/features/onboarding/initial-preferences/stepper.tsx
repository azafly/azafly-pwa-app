import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { Stack } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useTheme } from '@mui/material/styles';

import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import MobileStepper from '@mui/material/MobileStepper';

import { Dispatch, RootState } from 'app/store';

import { steps, StepLabel } from './steps';

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        stepper__root: {
            boxShadow: 'none !important',
            background: 'transparent  !important',
            width: '98vw',
            maxWidth: 1000,
            padding: 0,
            margin: 'auto',
            marginTop: '20vh'
        },
        progress: {
            backgroundColor: theme.colors.base
        },
        button: {
            margin: '1ch',
            textTransform: 'capitalize',
            color: theme.colors.base,
            fontSize: '0.85rem'
        },
        main: {
            maxWidth: 500,
            width: '90vw',
            margin: 'auto',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            background: 'inherit',
            marginTop: '40vh',
            '& .react-tel-input .form-control': {
                width: '100%',
                height: 50
            },
            [theme.breakpoints.only('xs')]: {
                marginTop: '35vh'
            }
        }
    })
);

const totalNumberOfSteps = Object.keys(steps).length;
export default function MobileOnboardingStepper() {
    const theme = useTheme();

    const dispatch = useDispatch<Dispatch>();
    const {
        onboarding: { activeStep = 'phone', disableNext, isPhoneVerified },
        auth: { token, user }
    } = useSelector(({ auth, onboarding }: RootState) => ({ auth, onboarding }));

    const step = steps[activeStep]?.index;
    const next = steps[activeStep]?.next;
    const prev = steps[activeStep]?.prev;

    const handleNext = () => {
        dispatch.onboarding.setActiveStep(steps[next as StepLabel].name as StepLabel);
    };

    const handleBack = () => {
        dispatch.onboarding.setActiveStep(steps[(prev as StepLabel) ?? 'phone'].name as StepLabel);
    };

    const disableNextLocal = disableNext || step === totalNumberOfSteps - 1;
    const disableBack = step === 0;

    const classes = useStyles();

    return (
        <>
            <MobileStepper
                variant='progress'
                steps={totalNumberOfSteps}
                position='top'
                classes={{
                    root: classes.stepper__root,
                    progress: classes.progress
                }}
                activeStep={steps[activeStep]?.index ?? 0}
                nextButton={
                    <Button
                        style={{
                            marginLeft: '2ch',
                            textTransform: 'capitalize',
                            fontWeight: 700,
                            fontFamily: 'Nunito',
                            color: '#0d324d',
                            fontSize: '0.9rem',
                            opacity: disableNextLocal ? 0.5 : 1,
                            pointerEvents: disableNext ? 'none' : undefined,
                            cursor: disableNextLocal ? '' : 'pointer'
                        }}
                        size='small'
                        variant={'text'}
                        onClick={handleNext}
                        disabled={disableNextLocal && isPhoneVerified}
                    >
                        {step === totalNumberOfSteps - 1 ? 'Done' : steps[next as StepLabel]?.name}
                        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                    </Button>
                }
                backButton={
                    <Button
                        variant={'text'}
                        size='small'
                        onClick={handleBack}
                        disabled={disableBack}
                        style={{
                            marginRight: '2ch',
                            fontWeight: 700,
                            textTransform: 'capitalize',
                            color: '#0d324d',
                            fontFamily: 'Nunito',
                            fontSize: '0.95rem',
                            opacity: disableBack ? 0.5 : 1,
                            pointerEvents: disableBack ? 'none' : undefined,
                            cursor: disableBack ? '' : 'pointer'
                        }}
                    >
                        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                        {prev ? prev : 'Back'}
                    </Button>
                }
            />
            <Stack className={classes.main}>{steps[activeStep]['component']}</Stack>
        </>
    );
}
