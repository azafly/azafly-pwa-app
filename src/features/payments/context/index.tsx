import React, { createContext, PropsWithChildren, useContext, useState } from 'react';
import { Country, NIGERIA } from './../hooks/use-country-list';
import { createPaymentIntent, getInitialOffer, CreatePaymentIntentBody as CreateIntentParams } from 'services/rest-api/user-payment';
import { IPaymentContext, PaymentContext, IRateInfo, UK } from './constants';

const paymentContext = createContext<IPaymentContext>(PaymentContext);

function usePaymentProvider() {
    const [isErrorState, setErrorState] = React.useState<boolean>(false);
    const [amount, setAmount] = React.useState(100);
    const [paymentLink, setPaymentLink] = useState('');
    const [paymentError, setPaymentError] = useState('');
    const [initialOffer, setInitialOffer] = useState<IPaymentContext['initialOffer']>(null);
    const [isLoading, setIsLoading] = useState(false);

    const [targetCountry, setTargetCountry] = React.useState<Country>(UK);
    const [sourceCountry, setSourceCountry] = React.useState<Country>(NIGERIA);

    const handleSourceCountryChange = (_: React.ChangeEvent<unknown>, value: Country) => {
        setSourceCountry(value);
    };

    const handleTargetCountryChange = (value: Country) => {
        setTargetCountry(value);
    };

    const handleSetAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(parseInt(event.target.value));
    };

    const rateInfoProps: IRateInfo = {
        handleSourceCountryChange,
        handleTargetCountryChange,
        sourceCountry,
        targetCountry,
        amount,
        handleSetAmount
    };

    const handleGetInitialOffer = async () => {
        if (!targetCountry || !sourceCountry || !amount) return;
        setIsLoading(true);
        getInitialOffer({ source_currency: targetCountry?.currency?.code, source_amount: amount, target_currency: sourceCountry?.currency?.code })
            .then(({ data }) => {
                setInitialOffer(data.data);
                localStorage.setItem('initialOffer', JSON.stringify(data.data));
            })
            .catch(() => setPaymentError('Error getting the best offers for you. Try again'))
            .finally(() => setIsLoading(false));
    };

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
            .then(({ data }) => setPaymentLink(data.data.payment_link))
            .catch(() => {
                setPaymentError('There was an Error connecting you to to one of our payment providers');
            })
            .finally(() => setIsLoading(false));
    };

    return {
        handleCreatePaymentIntent,
        handleGetInitialOffer,
        initialOffer,
        isErrorState,
        paymentError,
        paymentLink,
        rateInfoProps,
        setErrorState,
        isLoading
    };
}

export function PaymentProvider({ children }: PropsWithChildren<any>) {
    const payment = usePaymentProvider();
    return <paymentContext.Provider value={payment}> {children} </paymentContext.Provider>;
}

export const usePaymentContext = () => {
    return useContext(paymentContext);
};
