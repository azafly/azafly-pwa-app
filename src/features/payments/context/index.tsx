import React, { createContext, PropsWithChildren, useContext, useState } from 'react';
import { createPaymentIntent, CreatePaymentIntentBody as CreateIntentParams } from 'services/rest-client/user-payment';
import { IPaymentContext, PaymentContext } from './constants';
import { LOCAL_STORAGE_KEY } from 'libs/local-storage-client';
import { useGetPendingOfferByIdQuery } from 'api/generated/graphql';
import { useURLParams } from 'hooks/use-url-params';

const paymentContext = createContext<IPaymentContext>(PaymentContext);

function usePaymentProvider() {
    const [isErrorState, setErrorState] = React.useState<boolean>(false);
    const [canGoNext, setCanGoNext] = useState(false);
    const [paymentLink, setPaymentLink] = useState('');
    const [paymentError, setPaymentError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [activeStep, setActiveStep] = useState<IPaymentContext['activeStep']>(0);

    // pending offer
    const urlParamOfferId = useURLParams('offer_id');
    const { loading: loadingPendingOffer } = useGetPendingOfferByIdQuery({
        variables: { offer_id: urlParamOfferId }
    });

    const handleCreatePaymentIntent = async ({
        payment_offer_id,
        email,
        payment_title,
        currency,
        description,
        telephone,
        name
    }: CreateIntentParams) => {
        setIsLoading(true);
        createPaymentIntent({
            payment_offer_id,
            email,
            payment_title,
            currency,
            description,
            telephone,
            name
        })
            .then(({ data }) => {
                setPaymentLink(data.data.payment_link);
                localStorage.removeItem(LOCAL_STORAGE_KEY.INITIAL_OFFER);
            })
            .catch(() => {
                setPaymentError('There was an Error connecting you to to one of our payment providers');
            })
            .finally(() => setIsLoading(false));
    };

    return {
        activeStep,
        canGoNext,
        handleCreatePaymentIntent,
        isErrorState,
        isLoading: isLoading || loadingPendingOffer,
        paymentError,
        paymentLink,
        setActiveStep,
        setErrorState
    };
}

export function PaymentProvider({ children }: PropsWithChildren<any>) {
    const payment = usePaymentProvider();
    return <paymentContext.Provider value={payment}> {children} </paymentContext.Provider>;
}

export const usePaymentContext = () => {
    return useContext(paymentContext);
};
