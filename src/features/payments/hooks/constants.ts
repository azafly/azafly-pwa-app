import { CreatePaymentIntentBody } from 'services/rest-clients/user-payment';
import { Country } from 'types//country-data';
import { Dispatch } from 'react';
import { SetStateAction } from 'hoist-non-react-statics/node_modules/@types/react';

export interface IRateInfo {
    targetCountry: Country | null;
    sourceCountry: Country;
    handleSourceCountryChange: (value: Country) => void;
    handleTargetCountryChange: (_: React.ChangeEvent<unknown>, value: Country) => void;
    amount: number;
    handleSetAmount: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface IPaymentContext {
    isErrorState: boolean;
    setErrorState: (c: boolean) => void;
    paymentLink: string;
    handleCreatePaymentIntent: (params: CreatePaymentIntentBody) => void;
    paymentError: string;
    isLoading: boolean;
    activeStep: number;
    setActiveStep: Dispatch<SetStateAction<number>>;
}

export const PaymentContext: IPaymentContext = {
    isErrorState: false,
    setErrorState: () => null,
    paymentLink: '',
    handleCreatePaymentIntent: () => new Promise(() => {}),
    paymentError: '',
    isLoading: false,
    activeStep: 0,
    setActiveStep: () => {}
};
