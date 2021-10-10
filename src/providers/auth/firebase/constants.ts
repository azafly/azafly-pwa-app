export interface User {
    displayName: string | null;
    email: string | null;
    photoURL: string | null;
    uid: string | null;
    emailVerified: boolean;
    sendEmailVerification: Function;
}

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

export const defaultAuhContext = {
    signInWithGoogle: () => new Promise(() => {}),
    signInWithFacebook: () => new Promise(() => {}),
    user: defaultUser,
    confirmPasswordReset: () => new Promise(() => {}),
    sendPasswordResetEmail: () => new Promise(() => {}),
    signout: () => new Promise(() => {}),
    signinWithEmailPassword: () => new Promise(() => {}),
    signupWithEmailPassword: () => new Promise(() => {}),
    authState: defaultAuthState,
    resetLinkSuccess: false,
    verifyPasswordCode: () => new Promise(() => {}),
    verifyEmail: () => new Promise(() => {})
};
