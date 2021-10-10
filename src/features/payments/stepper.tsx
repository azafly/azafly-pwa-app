import { useState } from 'react';
import { Button, Stepper, Step, StepContent, StepLabel, Paper, Typography, Slide } from '@material-ui/core';
import { Link } from 'react-router-dom';

import { RatesInfo } from './forms/rates-info';
import { PayerInfo } from './forms/payment-info/payment-info';
import { PriceInfo } from './forms/price-info';
import { usePaymentContext } from './context';
import ReviewModal from './forms/payment-info/review';

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
            return <PayerInfo />;
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
                                    <div>
                                        <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                                            Back
                                        </Button>
                                        <button onClick={handleNext} className={classes.next} disabled={isErrorState}>
                                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                        </button>
                                    </div>
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
