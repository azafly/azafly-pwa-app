import { createModel } from '@rematch/core';

import { AuthState as FirebaseProviderAuthState, defaultAuthState } from 'providers/auth/firebase/constants';
import { RootModel } from './index';

type AuthState = FirebaseProviderAuthState & {
    isAdmin: boolean;
};

const authState: AuthState = {
    ...defaultAuthState,
    isAdmin: false
};

export const auth = createModel<RootModel>()({
    state: authState,
    reducers: {
        updateAuthState(state, payload: AuthState) {
            return { ...state, ...payload };
        }
    }
});
