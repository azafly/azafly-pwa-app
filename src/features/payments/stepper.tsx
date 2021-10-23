import { useState } from 'react';
import { Button, Stepper, Step, StepContent, StepLabel, Paper, Typography, Slide } from '@material-ui/core';
import { Link } from 'react-router-dom';

import { PaymentInfo } from './forms/payment-info/payment-info';
import { PriceInfo } from './forms/price-info';
import { RatesInfo } from './forms/rates-info';
import { usePaymentContext } from './context';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ReviewModal from './review/review';

// classes
import { useStepperStyles } from './classes';
import { ThreeDots } from '../user-dashboard/loader-skeleton';

const getSteps = ['Payment Info', 'Payment method', 'Payment Information', 'Review & Confirm', 'Make payment'];
export type Steps = typeof getSteps[number];

function getStepContent(step: number, handleNext: () => void) {
    switch (step) {
        case 0:
            return <RatesInfo />;
        case 1:
            return <PriceInfo />;
        case 2:
            return <PaymentInfo gotToNextStep={handleNext} />;
        case 3:
            return <ReviewModal />;
        case 4:
            return null;
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
        rateInfoProps: { amount },
        paymentLink,
        paymentError,
        handleGetInitialOffer,
        isLoading
    } = usePaymentContext();

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
                        onClick={async () => {
                            await handleGetInitialOffer();
                            console.log(paymentError);
                            !paymentError && handleNext();
                        }}
                        disabled={isErrorState}
                    >
                        <span>{'Get offer'}</span> <NavigateNextIcon />
                    </button>
                );
            case 1:
                return (
                    <Button
                        size='small'
                        className={classes.next}
                        variant={'contained'}
                        color={'primary'}
                        disabled={isErrorState}
                        onClick={handleNext}
                        disableElevation
                    >
                        Continue
                    </Button>
                );
            case 2:
                return null;
            case 3:
                return (
                    <Button className={classes.next} href={paymentLink} disabled={isErrorState || !paymentLink}>
                        {isLoading ? <ThreeDots /> : 'Pay'}
                        <NavigateNextIcon />
                    </Button>
                );
            case 4:
                return (
                    <Button className={classes.next} onClick={handleNext}>
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
                            <StepLabel className={classes.stepperLabel} onClick={() => !!amount && setActiveStep(index)}>
                                {label}
                            </StepLabel>
                            <StepContent>
                                {getStepContent(index, handleNext)}
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
                {activeStep === steps.length && (
                    <div className={classes.resetContainer}>
                        <Typography> All steps completed 🎉 </Typography>
                        <Link to={'/dashboard'} className={classes.dashboard_link}>
                            Track my payment
                        </Link>
                    </div>
                )}
            </div>
        </Slide>
    );
}
