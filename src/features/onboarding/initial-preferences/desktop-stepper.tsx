import { Button, Stepper, Step, StepContent, StepLabel, Slide } from '@material-ui/core';
import { useState } from 'react';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import { steps } from './steps';

// classes
import { useStepperStyles } from '../../account/classes';

export default function DesktopOnboardingStepper() {
    const classes = useStepperStyles();
    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };

    const handleStepper = (step: number) => {
        switch (step) {
            case 0:
                return (
                    <button
                        className={classes.next}
                        onClick={e => {
                            handleBack();
                        }}
                        disabled
                    >
                        <NavigateNextIcon />
                    </button>
                );
            case 1:
                return (
                    <Button
                        size='small'
                        className={classes.next}
                        variant={'contained'}
                        color={'primary'}
                        disabled
                        classes={{
                            disabled: classes.disabled
                        }}
                        onClick={handleNext}
                        disableElevation
                        endIcon={<NavigateNextIcon />}
                    >
                        Continue
                    </Button>
                );
            case 2:
                return null;
            case 3:
                return (
                    <Button
                        className={classes.next}
                        classes={{
                            disabled: classes.disabled
                        }}
                    >
                        <NavigateNextIcon />
                    </Button>
                );
            default:
                return <div> Unknown step</div>;
        }
    };

    return (
        <div className={classes.root}>
            <Stepper activeStep={activeStep} orientation='vertical'>
                {steps.map(({ component, label }, step) => (
                    <Step key={label}>
                        <StepLabel className={classes.stepperLabel} onClick={() => setActiveStep(step)}>
                            {label}
                        </StepLabel>
                        <Slide direction='up' in={true} mountOnEnter unmountOnExit appear timeout={800}>
                            <StepContent>
                                {component}

                                <div className={classes.actionsContainer}>
                                    <Button
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                        className={classes.button}
                                        color={'default'}
                                        variant={'outlined'}
                                    >
                                        Back
                                    </Button>

                                    {handleStepper(step)}
                                </div>
                            </StepContent>
                        </Slide>
                    </Step>
                ))}
            </Stepper>
        </div>
    );
}
