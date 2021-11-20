import { Dispatch, SetStateAction } from 'react';
import { EmailAndPasswordSignUp } from './firebase';
import 'firebase/firestore';

export interface User {
    displayName: string | null;
    email: string | null;
    photoURL: string | null;
    uid: string;
    emailVerified: boolean;
    phone?: string | null;
    sendEmailVerification: Function;
}

export interface FirebaseUser {
    displayName: string;
    firebaseId: string;
    email: string;
    phone?: string | null;
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
    displayName: '',
    email: 'olajohn@gmail.com',
    photoURL: '',
    uid: '',
    emailVerified: false,
    sendEmailVerification: () => {},
    phone: null
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
    signupWithEmailPassword: (additionalInfo: EmailAndPasswordSignUp) => Promise<void>;
    authState: AuthState;
    verifyPasswordCode: any;
    verifyEmail: any;
    setAuthError: Dispatch<SetStateAction<string>>;
    authError: string;
    isFirstTimeUser: boolean;
    handleUpdateFirebaseProfile: any;
}

export const defaultAuhContext: AuthContext = {
    signInWithGoogle: () => new Promise(() => {}),
    signInWithFacebook: () => new Promise(() => {}),
    confirmPasswordReset: () => new Promise(() => {}),
    sendPasswordResetEmail: () => new Promise(() => {}),
    signout: () => new Promise(() => {}),
    signinWithEmailPassword: () => new Promise(() => {}),
    signupWithEmailPassword: () => new Promise(() => {}),
    authState: defaultAuthState,
    verifyPasswordCode: () => new Promise(() => {}),
    verifyEmail: () => new Promise(() => {}),
    setAuthError: () => {},
    authError: '',
    isFirstTimeUser: false,
    handleUpdateFirebaseProfile: () => {}
};
