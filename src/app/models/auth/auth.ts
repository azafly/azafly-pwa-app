import { createModel } from '@rematch/core';

import { AuthState as FirebaseProviderAuthState, defaultAuthState } from 'providers/auth/firebase/constants';
import { RootModel } from '../index';
import { Users } from 'api/generated/graphql';

export type HasuraUser = Partial<Users> | null;

type AuthState = FirebaseProviderAuthState & {
    isAdmin?: boolean;
    hasuraUser?: HasuraUser;
};

const authState: AuthState = {
    ...defaultAuthState,
    isAdmin: false,
    hasuraUser: null
};

export const auth = createModel<RootModel>()({
    state: authState,
    reducers: {
        updateAuthState(state, payload: AuthState) {
            return { ...state, ...payload };
        },
        setHasuraUser(state, payload: AuthState['hasuraUser']) {
            return { ...state, hasuraUser: payload };
        },
        setIsNewUser(state, payload: AuthState['isNewUser']) {
            return { ...state, isNewUser: payload };
        }
    }
});
