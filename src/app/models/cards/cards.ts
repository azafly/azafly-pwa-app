import { createModel } from '@rematch/core';

import { RootModel } from '../index';
import { VirtualCardObject } from './mocks';

interface APIFetchState {
    result?: 'error' | 'success';
    type?: string;
    message?: string;
    loading?: boolean;
}

interface VirtualCardState {
    apiFetchState: APIFetchState;
    userCards: any;
    currentCard: VirtualCardObject | null;
    // store information if the user was referred to to-up from dashboard or from within card
    topUpReferer: 'dashboard' | 'card';
}

const initialState: VirtualCardState = {
    apiFetchState: {},
    userCards: {},
    currentCard: null,
    topUpReferer: 'card'
};

export const VIRTUAL_CARDS = createModel<RootModel>()({
    state: initialState,
    reducers: {
        setUserCards(state, payload: VirtualCardState['userCards']) {
            return { ...state, userCards: payload };
        },
        setFetchAPIState(state, payload: APIFetchState) {
            return { ...state, apiFetchState: payload };
        },
        setCurrentCard(state, payload: VirtualCardState['currentCard'] | string) {
            if (typeof payload === 'string') {
                return { ...state, currentCard: state.userCards[payload] };
            } else {
                return { ...state, currentCard: payload };
            }
        },
        setCardTopUpReferer(state, payload: VirtualCardState['topUpReferer']) {
            return { ...state, topUpReferer: payload };
        }
    }
});
