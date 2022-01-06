import { createModel } from '@rematch/core';

import { AuthState as FirebaseProviderAuthState, defaultAuthState } from 'providers/auth/firebase/constants';
import { RootModel } from './index';
import { Users as HasuraUser } from 'api/generated/graphql';

type AuthState = FirebaseProviderAuthState & {
    isAdmin: boolean;
    isAfrica: boolean;
    hasuraUser: Partial<HasuraUser> | null;
};

const authState: AuthState = {
    ...defaultAuthState,
    isAdmin: false,
    isAfrica: false,
    hasuraUser: null
};

export const auth = createModel<RootModel>()({
    state: authState,
    reducers: {
        updateAuthState(state, payload: AuthState) {
            return { ...state, ...payload };
        },
        setIsUserCountryAfrican(state, payload: boolean) {
            return { ...state, isAfrica: payload };
        },
        setHasuraUser(state, payload: AuthState['hasuraUser']) {
            return { ...state, hasuraUser: payload };
        }
    }
});
