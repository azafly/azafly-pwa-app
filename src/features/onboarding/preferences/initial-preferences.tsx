import { Button, Stepper, Step, StepContent, StepLabel, Slide } from '@material-ui/core';
import { useState } from 'react';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

// classes
import { useStepperStyles } from '../../account/classes';

const getSteps = ['Payment Info', 'Payment method', 'Payment Information', 'Review & Confirm'];
export type Steps = typeof getSteps[number];

function getStepContent(step: number) {
    switch (step) {
        case 0:
            return <div />;
        case 1:
            return <div />;
        case 2:
            return <div />;
        case 3:
            return <div />;
        default:
            return <div> Unknown step</div>;
    }
}

export function InitialPreferences() {
    const classes = useStepperStyles();
    const [activeStep, setActiveStep] = useState(0);

    const steps = getSteps;

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
        <Slide direction='up' in={true} mountOnEnter unmountOnExit appear timeout={800}>
            <div className={classes.root}>
                <Stepper activeStep={activeStep} orientation='vertical'>
                    {steps.map((label, index) => (
                        <Step key={label}>
                            <StepLabel className={classes.stepperLabel} onClick={() => setActiveStep(index)}>
                                {label}
                            </StepLabel>
                            <StepContent>
                                {getStepContent(index)}
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
                                    {handleStepper(index)}
                                </div>
                            </StepContent>
                        </Step>
                    ))}
                </Stepper>
            </div>
        </Slide>
    );
}
