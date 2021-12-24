import { Country, NIGERIA } from 'types/country-data';
import { createModel } from '@rematch/core';
import { GetOffersResponseData, getInitialOffer, GetOffersRequestBody } from 'services/rest-clients/user-payment';
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
    apiFetchState: APIFetchState;
    offerBasedOnRate?: GetOffersResponseData;
    paymentLink?: string;
    paymentIntentPayload?: any;
    verificationStatus: {
        result?: 'error' | 'success' | null;
        loading: boolean;
    };
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
        }
    },
    effects: dispatch => {
        return {
            async setInitialOffer({ source_currency, target_currency, source_amount }: GetOffersRequestBody, getState) {
                dispatch.payment.setApiFetchState({ ...getState.payment.apiFetchState, loading: true });
                try {
                    const { data } = await getInitialOffer({
                        source_currency,
                        target_currency,
                        source_amount
                    });
                    dispatch.payment.setApiFetchState({ ...getState.payment.apiFetchState, result: 'success', loading: false });
                    dispatch.payment.setOfferBasedOnRate(data.data);
                } catch (error) {
                    dispatch.payment.setApiFetchState({ ...getState.payment.apiFetchState, result: 'error', loading: false });
                } finally {
                    dispatch.payment.setApiFetchState({ ...getState.payment.apiFetchState, loading: false });
                }
            }
        };
    }
});
