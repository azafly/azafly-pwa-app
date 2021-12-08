import { CreatePaymentIntentBody, GetOffersResponse } from 'services/rest-client/user-payment';
import { Country, NIGERIA } from '../hooks/use-country-list';
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

export const UK = {
    label: 'UK',
    name: 'Britain',
    currency: {
        code: 'GBP',
        name: 'British pound',
        symbol: '£'
    },
    emoji: '🇬🇧',
    flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GB.svg',
    code: 'GB',
    region: 'EU',
    isPopular: true,
    isNotSupported: false,
    isComingSoon: false
};

export interface IPaymentContext {
    rateInfoProps: IRateInfo;
    isErrorState: boolean;
    setErrorState: (c: boolean) => void;
    paymentLink: string;
    handleGetInitialOffer: () => Promise<void>;
    handleCreatePaymentIntent: (params: CreatePaymentIntentBody) => void;
    paymentError: string;
    initialOffer: GetOffersResponse['data'] | null;
    isLoading: boolean;
    canGoNext: boolean;
    activeStep: number;
    setActiveStep: Dispatch<SetStateAction<number>>;
    setInitialOffer: any;
}

export const PaymentContext: IPaymentContext = {
    rateInfoProps: {
        targetCountry: NIGERIA,
        sourceCountry: NIGERIA,
        handleSourceCountryChange: () => null,
        handleTargetCountryChange: () => null,
        amount: 100,
        handleSetAmount: () => null
    },
    isErrorState: false,
    setErrorState: () => null,
    paymentLink: '',
    handleGetInitialOffer: () => new Promise(() => {}),
    handleCreatePaymentIntent: () => new Promise(() => {}),
    paymentError: '',
    initialOffer: null,
    isLoading: false,
    canGoNext: false,
    activeStep: 0,
    setInitialOffer: null,
    setActiveStep: () => {}
};
