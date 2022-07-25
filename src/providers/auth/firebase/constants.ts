import { User as FirebaseUser } from 'firebase/auth';

import 'firebase/firestore';

export interface LocalUser {
    displayName: string | null;
    email: string | null;
    photoURL: string | null;
    uid: string;
    emailVerified: boolean;
    phone?: string | null;
}

export interface EmailAndPasswordSignUpUser {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
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
    email: '',
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
    verifyPasswordCode: any;
    verifyEmail: any;
}

export const defaultAuhContext: AuthContext = {
    signInWithGoogle: () => new Promise(() => {}),
    confirmPasswordReset: () => new Promise(() => {}),
    sendPasswordResetEmail: () => new Promise(() => {}),
    signout: () => new Promise(() => {}),
    signinWithEmailPassword: () => new Promise(() => {}),
    verifyPasswordCode: () => new Promise(() => {}),
    verifyEmail: () => new Promise(() => {})
};

export function formatFirebaseErrorMessage(message: string) {
    // strings to replace and replacement
    const STRINGS_TO_REPLACE = [
        ['Firebase', ' '],
        ['auth/', ' '],
        ['-', ' '],
        [':', ''],
        ['(', ''],
        [')', '']
    ];
    let newString = message;
    STRINGS_TO_REPLACE.forEach(([original, replacement]) => {
        newString = newString.replaceAll(original, replacement);
    });
    return newString;
}
