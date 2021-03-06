import { createModel } from '@rematch/core';

import { Country } from 'types/country-data';
import { currencies, getCurrencyRates } from 'app/models/payments/mock';
import { GetOffersResponseData, getInitialOffer, GetOffersRequestBody } from 'services/rest-clients/user-payment';
import { RootModel } from '../index';

export enum PAYMENT_STATES {
    CREATING_OFFER = 'CREATING_OFFER',
    OFFER_CREATED = 'OFFER_CREATED',
    FETCHING_PAYMENT_LINK = 'FETCHING_PAYMENT_LINK',
    PAYMENT_LINK_SUCCESS = 'PAYMENT_LINK_SUCCESS',
    DONE = 'DONE',
    GROUND_ZERO = 'IDLE',
    ERROR = 'ERROR',
    RATES_FETCHED = 'RATES_FETCHED'
}

export interface RateInfo {
    targetCountry: Country;
    sourceCountry: Country;
    amount: number;
}
export type CurrencyCode = 'NGN' | 'USD' | 'EUR' | 'GBP' | 'CAD';
export type Rates = Record<string, any>;
export type BoundType = 'lower' | 'upper' | null;

interface APIFetchState {
    result?: 'error' | 'success' | null;
    type?: string;
    message?: string;
    loading: boolean;
}

export interface PaymentState {
    apiFetchState: APIFetchState;
    offerBasedOnRate?: GetOffersResponseData | null;
    paymentLink?: string;
    paymentIntentPayload?: any;
    verificationStatus: {
        result?: 'error' | 'success' | null;
        loading: boolean;
        message?: string;
    };
    buyAmount: number;
    buyCurrency: CurrencyCode;
    sellCurrencyTotalToPay: number;
    rates: Rates;
    sellCurrency: CurrencyCode;
    upperBoundLimitExceeded: boolean;
    loverBoundLimitNotReached: boolean;
    currentlyVerifiedOffer: any;
    DIRECT_activeStep: number;
    DIRECT_paymentIntentPayload: Record<string, any>;
    DIRECT_canGoNext: boolean;
}

const initialState: PaymentState = {
    apiFetchState: {
        result: null,
        loading: false
    },
    verificationStatus: {
        loading: false
    },
    buyAmount: 100,
    buyCurrency: 'CAD' as CurrencyCode,
    sellCurrencyTotalToPay: 0,
    rates: currencies,
    sellCurrency: 'NGN' as CurrencyCode,
    upperBoundLimitExceeded: false,
    loverBoundLimitNotReached: false,
    currentlyVerifiedOffer: {},
    DIRECT_activeStep: 0,
    DIRECT_paymentIntentPayload: {},
    DIRECT_canGoNext: false
};

export const payments = createModel<RootModel>()({
    state: initialState,
    reducers: {
        DIRECT_setActiveStep(state, payload: number) {
            return { ...state, DIRECT_activeStep: payload };
        },
        DIRECT_setCanGoNext(state, payload: boolean) {
            return { ...state, canGoNext: payload };
        },
        DIRECT_setPaymentIntentPayload(state, payload: PaymentState['DIRECT_paymentIntentPayload']) {
            return { ...state, DIRECT_paymentIntentPayload: payload };
        },
        setOfferBasedOnRate(state, payload: GetOffersResponseData | null) {
            return { ...state, offerBasedOnRate: payload };
        },
        setApiFetchState(state, payload: APIFetchState) {
            return { ...state, apiFetchState: payload };
        },
        setPaymentLink(state, payload: string) {
            return { ...state, paymentLink: payload };
        },
        setPaymentIntentPayload(state, payload: string) {
            return { ...state, paymentIntentPayload: payload };
        },
        setVerificationStatus(state, payload: PaymentState['verificationStatus']) {
            return { ...state, verificationStatus: payload };
        },
        setRates(state, payload: Rates) {
            return { ...state, rates: payload };
        },
        setFetchAPIState(state, payload: APIFetchState) {
            return { ...state, apiFetchState: payload };
        },
        setBuyAmount(state, payload: number) {
            return { ...state, buyAmount: payload };
        },
        setBuyCurrency(state, payload: CurrencyCode) {
            return { ...state, buyCurrency: payload };
        },
        setSellCurrency(state, payload: CurrencyCode) {
            return { ...state, sellCurrency: payload };
        },
        setSellCurrencyTotalToPay(state, payload: number) {
            return { ...state, sellCurrencyTotalToPay: payload };
        },
        setUpperLimitExceeded(state, payload: boolean) {
            return { ...state, upperBoundLimitExceeded: payload };
        },
        setLowerLimitExceeded(state, payload: boolean) {
            return { ...state, lowerBoundLimitExceeded: payload };
        },
        setCurrentlyVerifiedOffer(state, payload: any) {
            return { ...state, currentlyVerifiedOffer: payload };
        }
    },
    effects: dispatch => {
        return {
            async setInitialOffer({ source_currency, target_currency, source_amount }: GetOffersRequestBody, getState) {
                dispatch.payments.setApiFetchState({ result: null, loading: true, message: PAYMENT_STATES.CREATING_OFFER });
                try {
                    const { data } = await getInitialOffer({
                        source_currency,
                        target_currency,
                        source_amount
                    });

                    dispatch.payments.setApiFetchState({ result: 'success', loading: false, message: PAYMENT_STATES.OFFER_CREATED });
                    dispatch.payments.setOfferBasedOnRate(data.data);
                } catch (error) {
                    dispatch.payments.setApiFetchState({ ...getState.payments.apiFetchState, result: 'error', loading: false });
                } finally {
                    dispatch.payments.setApiFetchState({ ...getState.payments.apiFetchState, loading: false });
                }
            },
            async setExchangeRates() {
                const initialAPIState = {
                    type: 'settingExchangeRate',
                    message: '...fetching Rate...>',
                    loading: true
                };
                dispatch.dashboard.setFetchAPIState(initialAPIState);
                try {
                    const { data } = await getCurrencyRates();
                    dispatch.payments.setRates(data);
                    dispatch.payments.setFetchAPIState({
                        ...initialAPIState,
                        loading: false,
                        result: 'success',
                        message: 'Rates fetched successfully'
                    });
                } catch (error) {
                    dispatch.dashboard.setFetchAPIState({
                        ...initialAPIState,
                        loading: false,
                        result: 'error',
                        message: `${error}`
                    });
                }
            },
            async setTotalToPayInSellCurrencyAsync(_, getState) {
                const { buyAmount = 1, sellCurrency, buyCurrency, rates } = getState.payments;
                if (sellCurrency && buyCurrency && rates) {
                    rates?.[sellCurrency]?.[buyCurrency] &&
                        dispatch.payments.setSellCurrencyTotalToPay(buyAmount * rates[sellCurrency][buyCurrency]['rate']);
                }
                return 0;
            }
        };
    }
});
