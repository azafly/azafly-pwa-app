import { useState } from 'react';
import { Button, Stepper, Step, StepContent, StepLabel, Paper, Typography, Slide } from '@material-ui/core';
import { Link } from 'react-router-dom';

import { PaymentInfo } from './forms/payment-info/payment-info';
import { PriceInfo } from './forms/price-info';
import { RatesInfo } from './forms/rates-info';
import { usePaymentContext } from './context';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ReviewModal from './forms/review/review';

import { useStepperStyles } from './classes';

const getSteps = ['Payment Info', 'Payment method', 'Payment Information', 'Review & Confirm', 'Make payment'];
export type Steps = typeof getSteps[number];

function getStepContent(step: number) {
    switch (step) {
        case 0:
            return <RatesInfo />;
        case 1:
            return <PriceInfo />;
        case 2:
            return <PaymentInfo />;
        case 3:
            return <ReviewModal />;
        case 4:
            return <RatesInfo />;
        default:
            return <div> Unknown step</div>;
    }
}

export function VerticalPaymentStepper() {
    const classes = useStepperStyles();
    const [activeStep, setActiveStep] = useState(0);
    const steps = getSteps;
    const {
        isErrorState,
        rateInfoProps: { amount }
    } = usePaymentContext();

    const handleNext = () => {
        !!amount && setActiveStep(prevActiveStep => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };

    return (
        <Slide direction='up' in={true} mountOnEnter unmountOnExit appear timeout={800}>
            <div className={classes.root}>
                <Stepper activeStep={activeStep} orientation='vertical'>
                    {steps.map((label, index) => (
                        <Step key={label}>
                            <StepLabel className={classes.stepperLabel} onClick={() => !!amount && setActiveStep(index)}>
                                {label}
                            </StepLabel>
                            <StepContent>
                                {getStepContent(index)}
                                <div className={classes.actionsContainer}>
                                    <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                                        Back
                                    </Button>
                                    <button className={classes.next} onClick={handleNext} disabled={isErrorState}>
                                        <span>{activeStep === steps.length - 1 ? 'Finish' : 'Next'}</span> <NavigateNextIcon />
                                    </button>
                                </div>
                            </StepContent>
                        </Step>
                    ))}
                </Stepper>
                {activeStep === steps.length && (
                    <Paper square elevation={2} className={classes.resetContainer}>
                        <Typography>All steps completed - you&apos;re finished</Typography>
                        <Link to={'/dashboard'} className={classes.dashboard_link}>
                            Go To Dashboard
                        </Link>
                    </Paper>
                )}
            </div>
        </Slide>
    );
}
