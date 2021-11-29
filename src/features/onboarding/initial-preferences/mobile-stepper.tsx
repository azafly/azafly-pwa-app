import * as React from 'react';
import { Box } from '@mui/system';
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import MobileStepper from '@mui/material/MobileStepper';
import { Paper, Typography } from '@mui/material';

import { steps } from './steps';

export default function MobileOnboardingStepper() {
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: '40vh' }}>
            <Paper square elevation={0} sx={{}}>
                <Typography>{steps[activeStep].label}</Typography>
                <Box sx={{ width: '90vw', p: 2 }}>{steps[activeStep].text}</Box>
                {steps[activeStep]['component']}
            </Paper>

            <MobileStepper
                variant='progress'
                steps={steps.length}
                position='top'
                activeStep={activeStep}
                sx={{ width: '90vw', flexGrow: 1, margin: 'auto', marginTop: '20vh' }}
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
