import { createModel } from '@rematch/core';

import { AuthState, defaultAuthState } from 'providers/auth/firebase/constants';
import { RootModel } from './index';

export const auth = createModel<RootModel>()({
    state: defaultAuthState,
    reducers: {
        updateAuthState(state, payload: AuthState) {
            return { ...state, ...payload };
        }
    }
});
