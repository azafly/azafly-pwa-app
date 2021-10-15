import { Dispatch, SetStateAction } from 'react';
import { EmailAndPasswordSignUp } from './firebase';

export interface User {
    displayName: string | null;
    email: string | null;
    photoURL: string | null;
    uid: string | null;
    emailVerified: boolean;
    sendEmailVerification: Function;
}

export interface FirebaseUser {
    displayName: string;
    firebaseId: string;
    email: string;
    phone: string | null;
    emailVerified: boolean;
    photoURL: string | null;
}

export const defaultFirebaseUser: FirebaseUser = {
    displayName: '',
    firebaseId: '',
    email: '',
    phone: null,
    emailVerified: false,
    photoURL: null
};
export interface AuthState {
    user: User | null;
    isLoading: boolean;
    isError: boolean;
    isAuth?: boolean;
    token?: string;
}

export const defaultUser: User = {
    displayName: 'John',
    email: 'olajohn@gmail.com',
    photoURL: '',
    uid: '',
    emailVerified: false,
    sendEmailVerification: () => {}
};

export const defaultAuthState: AuthState = {
    user: defaultUser,
    isLoading: true,
    isError: false,
    isAuth: false
};
export interface AuthContext {
    signInWithGoogle: any;
    signInWithFacebook: any;
    confirmPasswordReset: any;
    sendPasswordResetEmail: any;
    signout: any;
    signinWithEmailPassword: any;
    signupWithEmailPassword: ((additionalInfo: EmailAndPasswordSignUp) => Promise<void>) | null;
    authState: AuthState;
    verifyPasswordCode: any;
    verifyEmail: any;
    setAuthError: Dispatch<SetStateAction<string>>;
    authError: string;
}

export const defaultAuhContext: AuthContext = {
    signInWithGoogle: () => new Promise(() => {}),
    signInWithFacebook: () => new Promise(() => {}),
    confirmPasswordReset: () => new Promise(() => {}),
    sendPasswordResetEmail: () => new Promise(() => {}),
    signout: () => new Promise(() => {}),
    signinWithEmailPassword: () => new Promise(() => {}),
    signupWithEmailPassword: null,
    authState: defaultAuthState,
    verifyPasswordCode: () => new Promise(() => {}),
    verifyEmail: () => new Promise(() => {}),
    setAuthError: () => {},
    authError: ''
};
