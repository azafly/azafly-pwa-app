import * as React from 'react';
import { Box } from '@mui/system';
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
            width: '90vw',
            flexGrow: 1,
            margin: 'auto',
            marginTop: '20vh',
            [theme.breakpoints.only('xs')]: {
                paddingTop: 0,
                width: '98vw'
            }
        }
    })
);

const totalNumberOfSteps = Object.keys(steps).length;
export default function MobileOnboardingStepper() {
    const theme = useTheme();

    const dispatch = useDispatch<Dispatch>();
    const { activeStep = 'phone' } = useSelector((state: RootState) => state.onboarding);

    const step = steps[activeStep]?.index;
    const next = steps[activeStep]?.next;
    const prev = steps[activeStep]?.prev;
    const handleNext = () => {
        dispatch.onboarding.setActiveStep(steps[next as StepLabel].name as StepLabel);
    };

    const handleBack = () => {
        dispatch.onboarding.setActiveStep(steps[(prev as StepLabel) ?? 'phone'].name as StepLabel);
    };

    React.useEffect(() => {
        dispatch.onboarding.getUserGeoLocationData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const classes = useStyles();

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: '40vh' }}>
            <Stack sx={{ maxWidth: 800, width: '90vw', margin: 'auto', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                <Box>{steps[activeStep as StepLabel]?.text}</Box>

                {steps[activeStep]['component']}
            </Stack>

            <MobileStepper
                variant='progress'
                steps={totalNumberOfSteps}
                position='top'
                classes={{ root: classes.stepper__root }}
                activeStep={steps[activeStep]?.index ?? 0}
                nextButton={
                    <Button size='small' onClick={handleNext} disabled={step === totalNumberOfSteps - 1}>
                        {step === totalNumberOfSteps - 1 ? 'Done' : steps[next as StepLabel]?.name}
                        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                    </Button>
                }
                backButton={
                    <Button size='small' onClick={handleBack} disabled={step === 0}>
                        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                        {prev ? prev : 'Back'}
                    </Button>
                }
            />
        </Box>
    );
}
