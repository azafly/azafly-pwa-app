import { createContext, PropsWithChildren, useContext, useEffect } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import { getStorage } from 'firebase/storage';
import { useDispatch, useSelector } from 'react-redux';
import {
    applyActionCode,
    confirmPasswordReset as confirmPassword,
    createUserWithEmailAndPassword,
    getAuth,
    GoogleAuthProvider,
    onAuthStateChanged,
    sendPasswordResetEmail as sendPasswordReset,
    signInWithEmailAndPassword as signInWithPass,
    signInWithPopup,
    getAdditionalUserInfo,
    verifyPasswordResetCode as verifyPassword,
    UserCredential
} from 'firebase/auth';

import { AuthContext, defaultAuhContext, EmailAndPasswordSignUpUser, formatFirebaseErrorMessage } from './constants';
import { firebaseApp } from './firebase-config';
import { RootState, Dispatch } from 'app/store';
import { ROUTE_MAP } from 'routes/utils';
import { LOCAL_STORAGE_KEY } from 'libs/local-storage-client';

export const database = getDatabase(firebaseApp);
export const firebaseAuth = getAuth();
export const storage = getStorage(firebaseApp);

const authContext = createContext<AuthContext>(defaultAuhContext);

function useFirebaseProviderAuth() {
    const dispatch = useDispatch<Dispatch>();
    const reduxAuthState = useSelector((state: RootState) => state.auth);

    /**
     * If user new user - Take user through additional basic onboarding,
     * Otherwise just take user to dashboard
     */
    const handleSignIn = async (signInCallback: Promise<UserCredential>) => {
        dispatch.auth.updateAuthState({ ...reduxAuthState, isLoading: true });
        try {
            const userCredential = await signInCallback;
            const { user } = userCredential;
            const token = await user.getIdToken(true);
            const { isNewUser } = getAdditionalUserInfo(userCredential) ?? { isNewUser: false };
            const to = isNewUser ? '/onboarding-update' : '/dashboard';

            dispatch.auth.updateAuthState({
                user,
                isAuth: true,
                isError: false,
                isLoading: false,
                token,
                isNewUser,
                action: 'sign-in'
            });
            debugger;
            location.replace(to);
            dispatch.dashboard.setCurrentDashboardTab('dashboard');
        } catch ({ message }) {
            dispatch.auth.updateAuthState({
                isAuth: false,
                isError: true,
                isLoading: false,
                hasuraUser: null,
                user: null,
                token: null,
                action: 'sign-in',
                errorMessage: formatFirebaseErrorMessage(message as string)
            });
        }
    };

    /**
     * If user exists throw Error (ask if user wants to login instead)
     * Take user through additional basic onboarding
     * Add user to DB
     * If success take user to Dashboard
     */
    const signupWithEmailPassword = async ({ email, password, firstName, lastName }: EmailAndPasswordSignUpUser) => {
        try {
            await createUserWithEmailAndPassword(firebaseAuth, email, password);
            dispatch.onboarding.setDisplayName(`${firstName} ${lastName}`);
            location.replace(ROUTE_MAP.ONBOARDING);
        } catch ({ message }) {
            dispatch.auth.updateAuthState({
                ...reduxAuthState,
                isError: true,
                action: 'sign-up',
                errorMessage: formatFirebaseErrorMessage(message as string)
            });
        }
    };
    const signout = async () => {
        return firebaseAuth
            .signOut()
            .then(() => {
                dispatch.auth.updateAuthState({ ...reduxAuthState, isAuth: false, user: null, token: null, isLoading: false });
                location.replace('/auth/signin');
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

    const signinWithEmailPassword = async (email: string, password: string) => {
        handleSignIn(signInWithPass(firebaseAuth, email, password));
    };

    const verifyEmail = async (actionCode: string) => {
        return applyActionCode(firebaseAuth, actionCode);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(firebaseAuth, async user => {
            if (user) {
                const token = await user.getIdToken();
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
                dispatch.auth.updateAuthState({
                    user: null,
                    isAuth: false,
                    isError: false,
                    isLoading: false,
                    token: null,
                    action: 'auth-changed'
                });
                localStorage.clear();
            }
        });
        return () => unsubscribe();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reduxAuthState.isNewUser]);
    console.log('re-renders');
    return {
        confirmPasswordReset,
        sendPasswordResetEmail,
        signinWithEmailPassword,
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
