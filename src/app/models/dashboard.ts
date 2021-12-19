import { createModel } from '@rematch/core';
import { getInitialOffer } from 'services/rest-clients/user-payment';

import { RootModel } from './index';

export type SideBarTabs = 'transactions' | 'cards' | 'payment' | 'account' | 'dashboard';
export type ViewState = 'local' | 'abroad';
interface APIFetchState {
    result?: 'error' | 'success';
    type?: string;
    message?: string;
    loading?: boolean;
}

export type CurrencyCode = 'NGN' | 'USD' | 'EUR' | 'GBP' | 'CAD';

interface DashboardState {
    apiFetchState: APIFetchState;
    buyAmount: number;
    buyCurrency: CurrencyCode;
    convertedAmount: number;
    currentSideBarTab: SideBarTabs;
    rate: number;
    sellCurrency: CurrencyCode;
    viewState: ViewState;
}

const initialState: DashboardState = {
    apiFetchState: {},
    buyAmount: 100,
    buyCurrency: 'CAD' as CurrencyCode,
    convertedAmount: 0,
    currentSideBarTab: 'transactions',
    rate: 2,
    sellCurrency: 'NGN' as CurrencyCode,
    viewState: 'abroad'
};

export const dashboard = createModel<RootModel>()({
    state: initialState,
    reducers: {
        setCurrentDashboardTab(state, payload: SideBarTabs) {
            return { ...state, currentSideBarTab: payload };
        },
        setViewState(state, payload: ViewState) {
            return { ...state, viewState: payload };
        },
        setBuyCurrency(state, payload: CurrencyCode) {
            return { ...state, buyCurrency: payload };
        },
        setSellCurrency(state, payload: CurrencyCode) {
            return { ...state, sellCurrency: payload };
        },
        setOfferRate(state, payload: number) {
            return { ...state, rate: payload };
        },
        setConvertedAmount(state, payload: number) {
            return { ...state, convertedAmount: payload };
        },
        setBuyAmount(state, payload: number) {
            return { ...state, buyAmount: payload };
        },
        setFetchAPIState(state, payload: APIFetchState) {
            return { ...state, apiFetchState: payload };
        }
    },
    effects: dispatch => {
        return {
            async toggleViewState(_, getState) {
                if (getState.auth.isAdmin) {
                    const viewState = getState.dashboard.viewState === 'abroad' ? 'local' : 'abroad';
                    dispatch.dashboard.setViewState(viewState);
                }
            },
            async setAsyncRateInfo(target_currency, getState) {
                const { buyAmount, sellCurrency } = getState.dashboard;

                console.log(target_currency);

                dispatch.dashboard.setFetchAPIState({ ...getState.dashboard.apiFetchState, loading: true });
                try {
                    const {
                        data: { data }
                    } = await getInitialOffer({
                        source_currency: target_currency,
                        target_currency: sellCurrency,
                        source_amount: buyAmount
                    });
                    dispatch.dashboard.setOfferRate(data.exchange_rate_info?.base_rate ?? 1);
                    dispatch.dashboard.setFetchAPIState({ ...getState.dashboard.apiFetchState, loading: false, result: 'success' });
                    dispatch.dashboard.setConvertedAmount(data.total_in_target_with_charges ?? 0);
                } catch (error) {
                    dispatch.dashboard.setFetchAPIState({
                        ...getState.dashboard.apiFetchState,
                        loading: false,
                        result: 'error',
                        message: `${error}`
                    });
                } finally {
                    dispatch.dashboard.setFetchAPIState({ ...getState.dashboard.apiFetchState, loading: false });
                }
            }
        };
    }
});
