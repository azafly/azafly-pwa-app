import { Box, Button, Stepper, Step, StepContent, StepLabel } from '@material-ui/core';
import { useEffect } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import { Dispatch, RootState } from 'app/store';
import { getInitialOffer } from 'services/rest-clients/user-payment';
import { GetOffersResponseData } from 'services/rest-clients/user-payment';
import { PAYMENT_STATES } from 'app/models/payments';
import { PaymentInfo } from './forms/payment-info/payment-info';
import { PriceInfo } from './forms/price-info';
import { RatesInfo } from './forms/rates-info';
import { ThreeDots } from 'components/css-loaders/three-dots';
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
    const { activeStep, paymentLink, setActiveStep } = usePaymentContext();
    const { apiFetchState, buyAmount, buyCurrency, DIRECT_activeStep, offerBasedOnRate, sellCurrency } = useSelector(
        (state: RootState) => state.payments
    );

    const handleNext = () => {
        dispatch.payments.DIRECT_setActiveStep(activeStep + 1);
        setActiveStep(prevActiveStep => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
        dispatch.payments.DIRECT_setActiveStep(activeStep - 1);
        history.push({
            state: {
                step: activeStep
            }
        });
    };

    // pending offer
    const urlParamOfferId = useURLParams('offer_id');
    const [handleGetPendingOffer, { data: pendingOffer }] = useGetPendingOfferByIdLazyQuery({
        variables: { offer_id: urlParamOfferId }
    });
    const handleGetOffersBasedOnRates = async () => {
        if (
            offerBasedOnRate?.source_currency === buyCurrency &&
            offerBasedOnRate?.target_currency === sellCurrency &&
            offerBasedOnRate.source_amount === buyAmount
        ) {
            dispatch.payments.DIRECT_setActiveStep(1);
            return;
        }
        dispatch.payments.setApiFetchState({ ...apiFetchState, loading: true, message: PAYMENT_STATES.CREATING_OFFER });
        try {
            const {
                data: { data }
            } = await getInitialOffer({ source_currency: buyCurrency, source_amount: buyAmount, target_currency: sellCurrency });
            dispatch.payments.setOfferBasedOnRate(data);
            dispatch.payments.setApiFetchState({ ...apiFetchState, loading: false, message: PAYMENT_STATES.OFFER_CREATED });
            dispatch.payments.DIRECT_setActiveStep(1);
        } catch (error) {
            dispatch.payments.setApiFetchState({ ...apiFetchState, loading: false, message: PAYMENT_STATES.ERROR });
        }
    };

    const handleStepper = (step: number) => {
        switch (step) {
            case 0:
                return apiFetchState?.loading ? (
                    <ThreeDots variantColor={'base'} loadingText={'creating offer'} />
                ) : (
                    <button
                        className={classes.next}
                        onClick={handleGetOffersBasedOnRates}
                        disabled={apiFetchState?.result === 'error' || apiFetchState.loading}
                    >
                        {'Get offer'}
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
                        disabled={apiFetchState?.result === 'error' || !offerBasedOnRate}
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
                        {apiFetchState?.loading ? <ThreeDots /> : 'Pay'}
                        <NavigateNextIcon />
                    </Button>
                );
            default:
                return <div> Unknown step</div>;
        }
    };

    useEffect(() => {
        const handleGetPendingOfferCallBack = () => {
            Promise.resolve(handleGetPendingOffer()).then(() => {
                pendingOffer?.payment_offer[0] &&
                    dispatch.payments.setOfferBasedOnRate({
                        ...pendingOffer?.payment_offer[0],
                        payment_offer_id: pendingOffer?.payment_offer[0].id
                    } as GetOffersResponseData);
            });
        };

        const computeStepToNavigateTo = () => {
            if (urlParamOfferId) {
                dispatch.payments.DIRECT_setActiveStep(0);
                setActiveStep(0);
                handleGetPendingOfferCallBack();
            } else {
                setActiveStep(DIRECT_activeStep);
            }
        };
        computeStepToNavigateTo();
    }, [handleGetPendingOffer, urlParamOfferId, pendingOffer, setActiveStep, dispatch.payments, DIRECT_activeStep, activeStep]);

    return (
        <div className={classes.root}>
            <Stepper activeStep={activeStep} orientation='vertical'>
                {steps.map((label, index) => (
                    <Step key={label}>
                        <StepLabel
                            className={classes.stepperLabel}
                            onClick={() => {
                                dispatch.payments.DIRECT_setActiveStep(index);
                                setActiveStep(index);
                            }}
                        >
                            {label}
                        </StepLabel>
                        <StepContent>
                            <Box width={'100%'}>{getStepContent(index, handleNext)}</Box>

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
    );
}
