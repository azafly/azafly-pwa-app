import { Country, NIGERIA } from '../hooks';

export interface IRateInfo {
    targetCountry: Country;
    sourceCountry: Country;
    handleSourceCountryChange: (_: React.ChangeEvent<unknown>, value: Country) => void;
    handleTargetCountryChange: (value: Country) => void;
    amount: number;
    handleSetAmount: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface IPaymentContext {
    rateInfoProps: IRateInfo;
    isErrorState: boolean;
    setErrorState: (c: boolean) => void;
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
    setErrorState: () => null
};
