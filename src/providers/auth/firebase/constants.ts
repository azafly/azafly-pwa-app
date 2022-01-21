import { User as FirebaseUser } from 'firebase/auth';

import 'firebase/firestore';
import { States_Aggregate_FieldsCountArgs } from 'api/generated/graphql';

export interface LocalUser {
    displayName: string | null;
    email: string | null;
    photoURL: string | null;
    uid: string;
    emailVerified: boolean;
    phone?: string | null;
}

export type User = LocalUser & Partial<FirebaseUser>;

export type Action = 'sign-in' | 'sign-up' | 'verify-email' | 'reset-password' | 'sign-out' | 'auth-changed';

export interface AuthState {
    user: User | null;
    isLoading: boolean;
    isError: boolean;
    isAuth: boolean;
    token: string | null;
    action?: Action;
    errorMessage?: string;
    successMessage?: string;
    isNewUser?: boolean;
}

export const defaultUser: User = {
    displayName: '',
    email: 'olajohn@gmail.com',
    photoURL: '',
    uid: '',
    emailVerified: false,
    phone: null
};

export const defaultAuthState: AuthState = {
    user: defaultUser,
    isLoading: false,
    isError: false,
    isAuth: false,
    token: null,
    isNewUser: false
};
export interface AuthContext {
    signInWithGoogle: any;
    confirmPasswordReset: any;
    sendPasswordResetEmail: any;
    signout: any;
    signinWithEmailPassword: any;
    signupWithEmailPassword: (email: string, password: string) => Promise<void>;
    verifyPasswordCode: any;
    verifyEmail: any;
}

export const defaultAuhContext: AuthContext = {
    signInWithGoogle: () => new Promise(() => {}),
    confirmPasswordReset: () => new Promise(() => {}),
    sendPasswordResetEmail: () => new Promise(() => {}),
    signout: () => new Promise(() => {}),
    signinWithEmailPassword: () => new Promise(() => {}),
    signupWithEmailPassword: () => new Promise(() => {}),
    verifyPasswordCode: () => new Promise(() => {}),
    verifyEmail: () => new Promise(() => {})
};
