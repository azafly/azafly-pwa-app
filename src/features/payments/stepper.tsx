import { useState } from 'react'
import { motion, Variants } from 'framer-motion'
import { Button, Stepper, Step, StepContent, StepLabel, Paper, Typography } from '@material-ui/core';


import { useStepperStyles } from './classes'
import { RatesInfo } from './forms/rates-info';
import { FadeInWhenVisible } from 'components/animate-in-view'

function getSteps() {
    return ['Payment Info', 'Payment method', 'Info for the receiver', 'Review & Confirm', 'Make payment']
}


const containerVariants: Variants = {
    enter: {
        x: 0,
        opacity: 1,
        decelerate: 5
    },
    exit: { x: -100, opacity: 0 },
};


function getStepContent(step: number) {
    switch (step) {
        case 0:
            return <RatesInfo />
        case 1:
            return <RatesInfo />
        case 2:
            return <RatesInfo />
        case 3:
            return <RatesInfo />
        case 4:
            return <RatesInfo />
        case 5:
            return <RatesInfo />

        default:
            return <div> Unknown step</div>;
    }
}

export function VerticalPaymentStepper() {
    const classes = useStepperStyles();
    const [activeStep, setActiveStep] = useState(0);
    const steps = getSteps();

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const startAllOver = () => {
        setActiveStep(0);
    };

    return (
        <FadeInWhenVisible>
            <motion.div
                variants={containerVariants}
                initial="exit"
                animate="enter"
                exit="exit"
                className={classes.root}>
                <Stepper activeStep={activeStep} orientation="vertical">
                    {steps.map((label, index) => (
                        <Step key={label} >
                            <StepLabel className={classes.stepperLabel} onClick={() => setActiveStep(index)}>{label}</StepLabel>
                            <StepContent>
                                {getStepContent(index)}
                                <div className={classes.actionsContainer}>
                                    <div>
                                        <Button
                                            disabled={activeStep === 0}
                                            onClick={handleBack}
                                            className={classes.button}
                                        >
                                            Back
                  </Button>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={handleNext}
                                            className={classes.button}
                                        >
                                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                        </Button>
                                    </div>
                                </div>
                            </StepContent>
                        </Step>
                    ))}
                </Stepper>
                {activeStep === steps.length && (
                    <Paper square elevation={0} className={classes.resetContainer}>
                        <Typography>All steps completed - you&apos;re finished</Typography>
                        <Button onClick={startAllOver} className={classes.button}>
                            Reset
          </Button>
                    </Paper>
                )}
            </motion.div>
        </FadeInWhenVisible>
    );
}