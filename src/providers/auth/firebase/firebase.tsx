import { createContext, PropsWithChildren, useCallback, useContext, useEffect } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import { getStorage } from 'firebase/storage';
import { useDispatch, useSelector } from 'react-redux';
import {
    applyActionCode,
    browserSessionPersistence,
    confirmPasswordReset as confirmPassword,
    createUserWithEmailAndPassword,
    FacebookAuthProvider,
    getAuth,
    GoogleAuthProvider,
    onAuthStateChanged,
    sendPasswordResetEmail as sendPasswordReset,
    setPersistence,
    signInWithEmailAndPassword as signInWithPass,
    signInWithPopup,
    UserCredential,
    verifyPasswordResetCode as verifyPassword
} from 'firebase/auth';

import { AuthContext, defaultAuhContext } from './constants';
import { firebaseApp } from './firebase-config';
import { LOCAL_STORAGE_KEY } from 'libs/local-storage-client';
import { RootState, Dispatch } from 'app/store';

export const database = getDatabase(firebaseApp);
export const firebaseAuth = getAuth();
export const storage = getStorage(firebaseApp);

const HASURA_CLAIMS_URL = 'https://hasura.io/jwt/claims';

export interface EmailAndPasswordSignUp {
    email: string;
    password: string;
}

const authContext = createContext<AuthContext>(defaultAuhContext);

function useFirebaseProviderAuth() {
    const dispatch = useDispatch<Dispatch>();
    const reduxAuthState = useSelector((state: RootState) => state.auth);
    const setAuthPersistence = useCallback(() => setPersistence(firebaseAuth, browserSessionPersistence).catch(error => console.log(error)), []);
    setAuthPersistence();

    const handleSignIn = async (signInCallback: Promise<UserCredential>) => {
        dispatch.auth.updateAuthState({ ...reduxAuthState, isLoading: true });
        try {
            const { user } = await signInCallback;
            const isNewUser = parseInt(user.metadata?.lastSignInTime ?? '0') - parseInt(user.metadata?.creationTime ?? '0') < 10;
            const token = await user.getIdToken(true);
            const to = isNewUser ? '/onboarding-update' : '/dashboard';
            dispatch.auth.updateAuthState({
                ...reduxAuthState,
                user,
                isAuth: true,
                isError: false,
                isLoading: false,
                token,
                action: 'sign-in'
            });
            location.replace(to);
            dispatch.dashboard.setCurrentDashboardTab('dashboard');
        } catch ({ message }) {
            dispatch.auth.updateAuthState({
                ...reduxAuthState,
                isAuth: false,
                isError: true,
                isLoading: false,
                user: null,
                action: 'sign-in',
                errorMessage: `${message}`
            });
        }
    };

    const signupWithEmailPassword = async ({ email, password }: EmailAndPasswordSignUp) => {
        handleSignIn(createUserWithEmailAndPassword(firebaseAuth, email, password));
    };

    const signout = async () => {
        return firebaseAuth
            .signOut()
            .then(() => {
                dispatch.auth.updateAuthState({ ...reduxAuthState, isAuth: false, user: null, token: null, isLoading: false });
                location.replace('/signin');
            })
            .catch(error => console.warn(error));
    };

    const sendPasswordResetEmail = async (email: string) => {
        return sendPasswordReset(firebaseAuth, email);
    };

    const verifyPasswordCode = async (code: string) => {
        return verifyPassword(firebaseAuth, code);
    };

    const confirmPasswordReset = async (code: string, password: string) => {
        return confirmPassword(firebaseAuth, code, password);
    };

    const signInWithGoogle = async () => {
        const googleProvider = new GoogleAuthProvider();
        handleSignIn(signInWithPopup(firebaseAuth, googleProvider));
    };

    const signInWithFacebook = async () => {
        handleSignIn(signInWithPopup(firebaseAuth, new FacebookAuthProvider()));
    };

    const signinWithEmailPassword = async (email: string, password: string) => {
        handleSignIn(signInWithPass(firebaseAuth, email, password));
    };

    const verifyEmail = async (actionCode: string) => {
        return applyActionCode(firebaseAuth, actionCode);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(firebaseAuth, async user => {
            if (user) {
                const token = await user.getIdToken(true);
                const idTokenResult = await user.getIdTokenResult();
                const hasuraClaim = idTokenResult.claims[HASURA_CLAIMS_URL];
                if (hasuraClaim) {
                    dispatch.auth.updateAuthState({
                        ...reduxAuthState,
                        user,
                        isAuth: true,
                        isError: false,
                        isLoading: false,
                        token,
                        action: 'auth-changed'
                    });
                    localStorage.setItem(LOCAL_STORAGE_KEY.TOKEN, token);
                } else {
                    // Check if refresh is required.
                    const metadataRef = ref(database, 'metadata/' + user.uid + '/refreshTime');
                    onValue(metadataRef, async snapshot => {
                        const data = snapshot.val();
                        if (data) {
                            // Force refresh to pick up the latest custom claims changes.
                            const newToken = await user.getIdToken(true);
                            dispatch.auth.updateAuthState({
                                ...reduxAuthState,
                                user,
                                isAuth: true,
                                isError: false,
                                isLoading: false,
                                token: newToken,
                                action: 'auth-changed'
                            });
                            localStorage.setItem(LOCAL_STORAGE_KEY.TOKEN, newToken);
                        } else {
                            return;
                        }
                    });
                }
            } else {
                dispatch.auth.updateAuthState({
                    ...reduxAuthState,
                    user: null,
                    isAuth: false,
                    isError: false,
                    isLoading: false,
                    token: null,
                    action: 'auth-changed'
                });
                localStorage.removeItem(LOCAL_STORAGE_KEY.TOKEN);
            }
        });
        return () => unsubscribe();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {
        confirmPasswordReset,
        sendPasswordResetEmail,
        signinWithEmailPassword,
        signInWithFacebook,
        signInWithGoogle,
        signout,
        signupWithEmailPassword,
        verifyEmail,
        verifyPasswordCode
    };
}

export function FirebaseAuthProvider({ children }: PropsWithChildren<unknown>) {
    const auth = useFirebaseProviderAuth();
    return <authContext.Provider value={auth}> {children} </authContext.Provider>;
}

export const useFirebaseAuthContext = () => {
    return useContext(authContext);
};
