import { CreatePaymentIntentBody, GetOffersResponse } from 'services/rest-api/user-payment';
import { Country, NIGERIA } from '../hooks/use-country-list';

export interface IRateInfo {
    targetCountry: Country;
    sourceCountry: Country;
    handleSourceCountryChange: (_: React.ChangeEvent<unknown>, value: Country) => void;
    handleTargetCountryChange: (value: Country) => void;
    amount: number;
    handleSetAmount: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const UK = {
    name: 'United Kingdom of Great Britain and Northern Ireland',
    currency: {
        code: 'GBP',
        name: 'British pound',
        symbol: '£'
    },
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
    isLoading: false
};
