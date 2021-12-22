import { createModel } from '@rematch/core';

import { currencies, getCurrencyRates } from 'app/models/payments/mock';
import { RootModel } from '../index';

interface APIFetchState {
    result?: 'error' | 'success';
    type?: string;
    message?: string;
    loading?: boolean;
}
export type CurrencyCode = 'NGN' | 'USD' | 'EUR' | 'GBP' | 'CAD';
export type Rates = typeof currencies;
interface LocalPaymentState {
    apiFetchState: APIFetchState;
    buyAmount: number;
    buyCurrency: CurrencyCode;
    sellCurrencyTotalToPay: number;
    rates: any;
    sellCurrency: CurrencyCode;
}

const initialState: LocalPaymentState = {
    apiFetchState: {},
    buyAmount: 1,
    buyCurrency: 'CAD' as CurrencyCode,
    sellCurrencyTotalToPay: 0,
    rates: null,
    sellCurrency: 'NGN' as CurrencyCode
};

export const localPayments = createModel<RootModel>()({
    state: initialState,
    reducers: {
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
        }
    },
    effects: dispatch => {
        return {
            async setExchangeRates() {
                const initialAPIState = {
                    type: 'settingExchangeRate',
                    message: '...fetching Rate...>',
                    loading: true
                };
                dispatch.dashboard.setFetchAPIState(initialAPIState);
                try {
                    const { data } = await getCurrencyRates();
                    dispatch.localPayments.setRates(data);
                    dispatch.localPayments.setFetchAPIState({
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
                const { buyAmount = 1, sellCurrency, buyCurrency, rates } = getState.localPayments;
                // set limit from server imposed limit
                dispatch.localPayments.setSellCurrencyTotalToPay(buyAmount * rates[sellCurrency][buyCurrency]['rate']);
            }
        };
    }
});
