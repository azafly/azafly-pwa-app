import { createModel } from '@rematch/core';

import { currencies, getCurrencyRates } from 'app/models/payments/mock';
import { getCurrentExchangeRates } from 'services/rest-clients/user-payment';
import { RootModel } from '../index';

interface APIFetchState {
    result?: 'error' | 'success';
    type?: string;
    message?: string;
    loading?: boolean;
}
export type CurrencyCode = 'NGN' | 'USD' | 'EUR' | 'GBP' | 'CAD';
export type Rates = typeof currencies;
export type BoundType = 'lower' | 'upper' | null;

interface LocalPaymentState {
    apiFetchState: APIFetchState;
    buyAmount: number;
    buyCurrency: CurrencyCode;
    sellCurrencyTotalToPay: number;
    rates: any;
    sellCurrency: CurrencyCode;
    upperBoundLimitExceeded: boolean;
    loverBoundLimitNotReached: boolean;
}

const initialState: LocalPaymentState = {
    apiFetchState: {},
    buyAmount: 1001,
    buyCurrency: 'CAD' as CurrencyCode,
    sellCurrencyTotalToPay: 0,
    rates: null,
    sellCurrency: 'NGN' as CurrencyCode,
    upperBoundLimitExceeded: false,
    loverBoundLimitNotReached: false
};

export const localPayments = createModel<RootModel>()({
    state: initialState,
    reducers: {
        setRates(state, payload: Record<string, unknown> | null) {
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
            async setExchangeRates() {
                const initialAPIState = {
                    type: 'settingExchangeRate',
                    message: '...fetching Rate...',
                    loading: true
                };
                dispatch.localPayments.setFetchAPIState(initialAPIState);

                try {
                    const rates = await getCurrentExchangeRates();
                    dispatch.localPayments.setRates(rates);
                    dispatch.localPayments.setFetchAPIState({
                        ...initialAPIState,
                        loading: false,
                        result: 'success',
                        message: 'Rates fetched successfully'
                    });
                } catch (error) {
                    dispatch.localPayments.setFetchAPIState({
                        ...initialAPIState,
                        loading: false,
                        result: 'error',
                        message: `${error}`
                    });
                }
            },
            async setTotalToPayInSellCurrency(_, getState) {
                const { buyAmount = 1, sellCurrency, buyCurrency, rates } = getState.localPayments;
                if (!rates) {
                    dispatch.localPayments.setFetchAPIState({
                        loading: false,
                        result: 'error',
                        message: `We couldn't get the current rate`
                    });
                    dispatch.localPayments.setSellCurrencyTotalToPay(0);
                } else {
                    dispatch.localPayments.setSellCurrencyTotalToPay(buyAmount * rates[sellCurrency][buyCurrency]);
                }
            }
        };
    }
});
