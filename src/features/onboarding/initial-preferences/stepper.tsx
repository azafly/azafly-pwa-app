import * as React from 'react';
import { Box } from '@mui/system';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { Stack, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useTheme } from '@mui/material/styles';

import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import MobileStepper from '@mui/material/MobileStepper';

import { RootState, Dispatch } from 'app/store';

import { steps } from './steps';

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

export default function MobileOnboardingStepper() {
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const dispatch = useDispatch<Dispatch>();

    const handleNext = () => {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };

    React.useEffect(() => {
        dispatch.onboarding.getUserGeoLocationData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const classes = useStyles();
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: '40vh' }}>
            <Stack sx={{ maxWidth: 800, width: '90vw', margin: 'auto', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                <Typography>{steps[activeStep].label}</Typography>
                <Box>{steps[activeStep].text}</Box>
                {steps[activeStep]['component']}
            </Stack>

            <MobileStepper
                variant='progress'
                steps={steps.length}
                position='top'
                classes={{ root: classes.stepper__root }}
                activeStep={activeStep}
                nextButton={
                    <Button size='small' onClick={handleNext} disabled={activeStep === steps.length - 1}>
                        {activeStep === steps.length - 1 ? 'Done' : steps[activeStep + 1]['label']}
                        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                    </Button>
                }
                backButton={
                    <Button size='small' onClick={handleBack} disabled={activeStep === 0}>
                        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                        Back
                    </Button>
                }
            />
        </Box>
    );
}
