import { Country, NIGERIA } from 'types/country-data';
import { createModel } from '@rematch/core';
import { getInitialOffer } from '../../services/rest-client/user-payment';
import { GetOffersResponse } from 'services/rest-client/user-payment';
import { RootModel } from './index';

export interface RateInfo {
    targetCountry: Country;
    sourceCountry: Country;
    amount: number;
}

interface APIFetchState {
    result?: 'error' | 'success' | null;
    type?: string;
    message?: string;
    loading: boolean;
}

export interface PaymentState {
    rateInfo: RateInfo;
    initialOffer: GetOffersResponse['data'] | null;
    apiFetchState: APIFetchState;
}

const initialState: PaymentState = {
    rateInfo: {
        targetCountry: NIGERIA,
        sourceCountry: NIGERIA,
        amount: 100
    },
    initialOffer: null,
    apiFetchState: {
        result: null,
        loading: false
    }
};

export const payment = createModel<RootModel>()({
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
        setRatesInfoInitialOffer(state, payload) {
            return { ...state, initialOffer: payload };
        },
        setApiFetchState(state, payload: APIFetchState) {
            return { ...state, apiFetchState: payload };
        }
    },
    effects: dispatch => {
        return {
            async setInitialOffer(_, getState) {
                dispatch.payment.setApiFetchState({ ...getState.payment.apiFetchState, loading: true });
                try {
                    const { data } = await getInitialOffer({
                        source_currency: getState.payment.rateInfo.sourceCountry.currency.code,
                        target_currency: getState.payment.rateInfo.targetCountry.currency.code,
                        source_amount: getState.payment.rateInfo.amount
                    });
                    dispatch.payment.setApiFetchState({ ...getState.payment.apiFetchState, result: 'success', loading: false });
                    dispatch.payment.setRatesInfoInitialOffer(data.data);
                } catch (error) {
                    dispatch.payment.setApiFetchState({ ...getState.payment.apiFetchState, result: 'error', loading: false });
                } finally {
                    dispatch.payment.setApiFetchState({ ...getState.payment.apiFetchState, result: null, loading: false });
                }
            }
        };
    }
});
