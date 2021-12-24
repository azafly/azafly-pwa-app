import { createModel } from '@rematch/core';

import { Country, NIGERIA } from 'types/country-data';
import { currencies, getCurrencyRates } from 'app/models/payments/mock';
import { GetOffersResponseData, getInitialOffer, GetOffersRequestBody } from 'services/rest-clients/user-payment';
import { RootModel } from '../index';

export interface RateInfo {
    targetCountry: Country;
    sourceCountry: Country;
    amount: number;
}
export type CurrencyCode = 'NGN' | 'USD' | 'EUR' | 'GBP' | 'CAD';
export type Rates = typeof currencies;
export type BoundType = 'lower' | 'upper' | null;

interface APIFetchState {
    result?: 'error' | 'success' | null;
    type?: string;
    message?: string;
    loading: boolean;
}

export interface PaymentState {
    rateInfo: RateInfo;
    apiFetchState: APIFetchState;
    offerBasedOnRate?: GetOffersResponseData;
    paymentLink?: string;
    paymentIntentPayload?: any;
    verificationStatus: {
        result?: 'error' | 'success' | null;
        loading: boolean;
    };
    buyAmount: number;
    buyCurrency: CurrencyCode;
    sellCurrencyTotalToPay: number;
    rates: any;
    sellCurrency: CurrencyCode;
    upperBoundLimitExceeded: boolean;
    loverBoundLimitNotReached: boolean;
}

const initialState: PaymentState = {
    rateInfo: {
        targetCountry: NIGERIA,
        sourceCountry: NIGERIA,
        amount: 100
    },
    apiFetchState: {
        result: null,
        loading: false
    },
    verificationStatus: {
        result: null,
        loading: false
    },
    buyAmount: 100,
    buyCurrency: 'CAD' as CurrencyCode,
    sellCurrencyTotalToPay: 0,
    rates: null,
    sellCurrency: 'NGN' as CurrencyCode,
    upperBoundLimitExceeded: false,
    loverBoundLimitNotReached: false
};

export const payments = createModel<RootModel>()({
    state: initialState,
    reducers: {
        setRatesInfoAmount(state, payload: number) {
            const rateInfo = {
                ...state.rateInfo,
                amount: payload
            };
            return { ...state, ...rateInfo };
        },
        setRatesInfoSourceCountry(state, payload: Country) {
            return { ...state, sourceCountry: { ...payload } };
        },
        setRatesInfoTargetCountry(state, payload: Country) {
            return { ...state, targetCountry: { ...payload } };
        },
        setOfferBasedOnRate(state, payload: GetOffersResponseData) {
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
        }
    },
    effects: dispatch => {
        return {
            async setInitialOffer({ source_currency, target_currency, source_amount }: GetOffersRequestBody, getState) {
                dispatch.payments.setApiFetchState({ ...getState.payments.apiFetchState, loading: true });
                try {
                    const { data } = await getInitialOffer({
                        source_currency,
                        target_currency,
                        source_amount
                    });
                    dispatch.payments.setApiFetchState({ ...getState.payments.apiFetchState, result: 'success', loading: false });
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
            async setTotalToPayInSellCurrency(_, getState) {
                const { buyAmount = 1, sellCurrency, buyCurrency, rates } = getState.payments;
                dispatch.payments.setSellCurrencyTotalToPay(buyAmount * rates[sellCurrency][buyCurrency]['rate']);
            }
        };
    }
});
