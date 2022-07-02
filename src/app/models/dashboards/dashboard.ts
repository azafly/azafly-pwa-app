import { createModel } from '@rematch/core';

import { RootModel } from '../index';

export type SideBarTabs = 'transactions' | 'cards' | 'payment' | 'account' | 'dashboard';
export type ViewState = 'local' | 'abroad';
interface APIFetchState {
    result?: 'error' | 'success';
    type?: string;
    message?: string;
    loading?: boolean;
}
export const defaultCurrentVirtualCard: CardIdentifier = {
    currency: 'USD' as CurrencyCode,
    openTopUpModal: false,
    action: 'top-up'
};

export type CurrencyCode = 'NGN' | 'USD' | 'EUR' | 'GBP' | 'CAD';
interface CardIdentifier {
    currency: CurrencyCode;
    openTopUpModal?: boolean;
    action?: 'top-up' | 'settings' | 'freeze' | 'pin';
}

interface DashboardState {
    apiFetchState: APIFetchState;
    currentSideBarTab: SideBarTabs;
    currentVirtualCard: CardIdentifier;
}

const initialState: DashboardState = {
    apiFetchState: {},
    currentSideBarTab: 'transactions',
    currentVirtualCard: defaultCurrentVirtualCard
};

export const dashboard = createModel<RootModel>()({
    state: initialState,
    reducers: {
        setCurrentDashboardTab(state, payload: SideBarTabs) {
            return { ...state, currentSideBarTab: payload };
        },
        setFetchAPIState(state, payload: APIFetchState) {
            return { ...state, apiFetchState: payload };
        },
        setCurrentCardIdentifier(state, payload: CardIdentifier) {
            return { ...state, currentVirtualCard: payload };
        }
    }
});
