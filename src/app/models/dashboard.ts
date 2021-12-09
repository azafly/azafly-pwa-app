import { createModel } from '@rematch/core';
import { RootModel } from './index';

export type SideBarTabs = 'transactions' | 'cards' | 'payment' | 'account' | 'dashboard';

interface DashboardState {
    currentSideBarTab: SideBarTabs;
}

const initialState: DashboardState = {
    currentSideBarTab: 'transactions'
};

export const dashboard = createModel<RootModel>()({
    state: initialState,
    reducers: {
        setCurrentDashboardTab(state, payload: SideBarTabs) {
            return { ...state, currentSideBarTab: payload };
        }
    }
});
