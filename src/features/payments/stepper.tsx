import { Button, Stepper, Step, StepContent, StepLabel, Zoom } from '@material-ui/core';
import { useEffect } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import { Dispatch, RootState } from 'app/store';
import { isAllValueTruthy } from '../../libs/index';
import { localStorageClient, LOCAL_STORAGE_KEY } from 'libs/local-storage-client';
import { PaymentInfo } from './forms/payment-info/payment-info';
import { PriceInfo } from './forms/price-info';
import { RatesInfo } from './forms/rates-info';
import { ThreeDots } from '../user-dashboard/loader-skeleton';
import { useGetPendingOfferByIdLazyQuery } from 'api/generated/graphql';
import { usePaymentContext } from './context';
import { useStepperStyles } from './classes';
import { useURLParams } from 'hooks/use-url-params';
import ReviewModal from './review/review';

const getSteps = ['Payment Info', 'Payment method', 'Payment Information', 'Review & Confirm'];
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
        default:
            return <div> Unknown step</div>;
    }
}

export function VerticalPaymentStepper() {
    const classes = useStepperStyles();
    const history = useHistory();
    const dispatch = useDispatch<Dispatch>();

    const steps = getSteps;
    const { activeStep, canGoNext, paymentLink, setActiveStep } = usePaymentContext();
    const { apiFetchState, DIRECT_activeStep } = useSelector((state: RootState) => state.payments);

    const handleNext = () => {
        localStorageClient<number>({ method: 'SET', key: LOCAL_STORAGE_KEY.PAYMENT_ACTIVE_STEP, data: activeStep + 1 });
        dispatch.payments.DIRECT_setActiveStep(activeStep + 1);
        setActiveStep(prevActiveStep => prevActiveStep + 1);
    };

    const handleBack = () => {
        localStorageClient<number>({ method: 'SET', key: LOCAL_STORAGE_KEY.PAYMENT_ACTIVE_STEP, data: activeStep - 1 });
        setActiveStep(prevActiveStep => prevActiveStep - 1);
        dispatch.payments.DIRECT_setActiveStep(activeStep - 1);
        history.push({
            state: {
                step: activeStep
            }
        });
    };

    const handleStepper = (step: number) => {
        switch (step) {
            case 0:
                return (
                    <button
                        className={classes.next}
                        onClick={() => {
                            localStorageClient<number>({ method: 'SET', key: LOCAL_STORAGE_KEY.PAYMENT_ACTIVE_STEP, data: 1 });
                            dispatch.payments.DIRECT_setActiveStep(1);
                        }}
                        disabled={apiFetchState?.result === 'error'}
                    >
                        {apiFetchState?.loading ? <ThreeDots style={{ height: 30 }} /> : 'Get offer'}
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
                        disabled={apiFetchState?.result === 'error'}
                        classes={{
                            disabled: classes.disabled
                        }}
                        onClick={() => {
                            handleNext();
                        }}
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
                        href={paymentLink}
                        classes={{
                            disabled: classes.disabled
                        }}
                        onClick={() => dispatch.payments.DIRECT_setPaymentIntentPayload({})}
                        disabled={apiFetchState?.result === 'error' || !paymentLink}
                    >
                        {apiFetchState?.loading ? <ThreeDots style={{ height: 30 }} /> : 'Pay'}
                        <NavigateNextIcon />
                    </Button>
                );
            default:
                return <div> Unknown step</div>;
        }
    };

    // pending offer
    const urlParamOfferId = useURLParams('offer_id');
    const urlParamStep = useURLParams('step');
    const [handleGetPendingOffer, { data: pendingOffer }] = useGetPendingOfferByIdLazyQuery({
        variables: { offer_id: urlParamOfferId }
    });

    useEffect(() => {
        const computeStepToNavigateTo = () => {
            if (urlParamOfferId && urlParamStep) {
                Promise.resolve(handleGetPendingOffer()).then(() => {
                    const { source_amount, source_currency, target_currency, total_in_target_with_charges } = pendingOffer?.payment_offer[0] ?? {};
                    localStorage.setItem(
                        LOCAL_STORAGE_KEY.INITIAL_OFFER,
                        JSON.stringify({ source_amount, source_currency, target_currency, total_in_target_with_charges })
                    );
                    setActiveStep(Number(urlParamStep));
                    dispatch.payments.DIRECT_setActiveStep(Number(urlParamStep));
                });
            }
            if (urlParamStep && !urlParamOfferId) {
                setActiveStep(0);
                dispatch.payments.DIRECT_setActiveStep(0);
            }
        };
        computeStepToNavigateTo();
        setActiveStep(DIRECT_activeStep);
    }, [handleGetPendingOffer, urlParamOfferId, urlParamStep, pendingOffer, setActiveStep, dispatch.payments, DIRECT_activeStep]);

    useEffect(() => {
        const { amount, buyCurrency, refer, sellCurrency, step } = history.location.state ?? {};
        console.log(isAllValueTruthy({ amount, buyCurrency, refer, sellCurrency, step }));
        if (isAllValueTruthy({ amount, buyCurrency, refer, sellCurrency, step })) {
            setActiveStep(step);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [history]);

    return (
        <Zoom in={true} mountOnEnter unmountOnExit appear timeout={800}>
            <div className={classes.root}>
                <Stepper activeStep={activeStep} orientation='vertical'>
                    {steps.map((label, index) => (
                        <Step key={label}>
                            <StepLabel className={classes.stepperLabel} onClick={() => canGoNext && setActiveStep(index)}>
                                {label}
                            </StepLabel>
                            <StepContent>
                                {getStepContent(index, handleNext)}
                                {activeStep !== 2 && (
                                    <div className={classes.actionsContainer}>
                                        <Button
                                            disabled={activeStep === 0}
                                            onClick={handleBack}
                                            className={classes.button}
                                            color='secondary'
                                            variant={'contained'}
                                        >
                                            Back
                                        </Button>
                                        {handleStepper(index)}
                                    </div>
                                )}
                            </StepContent>
                        </Step>
                    ))}
                </Stepper>
            </div>
        </Zoom>
    );
}
