import React, { createContext, PropsWithChildren, useContext } from 'react';
import { IPaymentContext, PaymentContext, IRateInfo } from './constants';
import { Country, NIGERIA, useCountryList } from './../hooks';

const paymentContext = createContext<IPaymentContext>(PaymentContext);

function usePaymentProvider() {
    const [sourceCountry, setSourceCountry] = React.useState<Country>(NIGERIA);
    const [isErrorState, setErrorState] = React.useState<boolean>(false);
    const [amount, setAmount] = React.useState(100);

    const { popularTargetCountries } = useCountryList();
    const defaultTargetCountry = popularTargetCountries.filter(country => country.name === 'United Kingdom of Great Britain and Northern Ireland')[0];
    const [targetCountry, setTargetCountry] = React.useState<Country>(defaultTargetCountry);

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

    return {
        rateInfoProps,
        isErrorState,
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
