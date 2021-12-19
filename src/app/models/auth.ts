import { createModel } from '@rematch/core';

import { AuthState as FirebaseProviderAuthState, defaultAuthState } from 'providers/auth/firebase/constants';
import { RootModel } from './index';

type AuthState = FirebaseProviderAuthState & {
    isAdmin: boolean;
    isAfrica: boolean;
};

const authState: AuthState = {
    ...defaultAuthState,
    isAdmin: false,
    isAfrica: false
};

export const auth = createModel<RootModel>()({
    state: authState,
    reducers: {
        updateAuthState(state, payload: AuthState) {
            return { ...state, ...payload };
        },
        setIsUserCountryAfrican(state, payload: boolean) {
            return { ...state, isAfrica: payload };
        }
    }
});
