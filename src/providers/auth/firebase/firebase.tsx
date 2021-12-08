import { createContext, PropsWithChildren, useState, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AuthContext, defaultAuhContext, FirebaseUser } from './constants';
import { RootState, Dispatch } from 'app/store';
import { firebaseApp, firebaseConfig } from './firebase-config';
import { LOCAL_STORAGE_KEY } from 'libs/local-storage-client';

import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/storage';

firebaseApp.initializeApp(firebaseConfig);
const fireStore = firebaseApp.firestore();
export const storage = firebaseApp.storage();

const HASURA_CLAIMS_URL = 'https://hasura.io/jwt/claims';

export interface EmailAndPasswordSignUp {
    email: string;
    password: string;
    displayName: string;
}

const authContext = createContext<AuthContext>(defaultAuhContext);

export const getUserById = async (firebaseId: string) => {
    return new Promise((resolve, reject) => {
        fireStore.collection(LOCAL_STORAGE_KEY.USER).onSnapshot(snapshot => {
            const updatedData = snapshot.docs.map(doc => doc.data());
            const updatedUser = updatedData.filter(({ user }) => user.firebaseId === firebaseId);
            resolve(updatedUser);
        }, reject);
    });
};

export const addUser = (user: FirebaseUser) => {
    return fireStore.collection(LOCAL_STORAGE_KEY.USER).add({
        user
    });
};

export const updateUserVerification = (userId: string) => {
    return fireStore.collection(LOCAL_STORAGE_KEY.USER).doc(userId).set({ emailVerified: true }, { merge: true });
};

export const updateFirebaseUser = (userId: string, user: Partial<FirebaseUser>) => {
    return fireStore.collection(LOCAL_STORAGE_KEY.USER).doc(userId).set(user, { merge: true });
};

function useFirebaseProviderAuth() {
    const [authError, setAuthError] = useState('');

    const dispatch = useDispatch<Dispatch>();
    const reduxAuthState = useSelector((state: RootState) => state.auth);

    const handleUpdateFirebaseProfile = (user: any, profile: Partial<FirebaseUser>) => {
        user.updateProfile(profile)
            .then(() => {
                dispatch.auth.updateAuthState({ ...reduxAuthState, user, isAuth: true });
            })
            .catch((error: unknown) => console.log(error));
    };

    const signupWithEmailPassword = async ({ email, password, displayName }: EmailAndPasswordSignUp) => {
        const { user } = await firebaseApp.auth().createUserWithEmailAndPassword(email, password);
        if (user) {
            const profile = { displayName };
            localStorage.setItem(LOCAL_STORAGE_KEY.IS_EMAIL_SIGNUP_SENT, 'true');
            user.updateProfile(profile)
                .then(async () => {
                    const token = await user.getIdToken(true);
                    const idTokenResult = await user.getIdTokenResult();
                    const hasuraClaim = idTokenResult.claims[HASURA_CLAIMS_URL];
                    if (hasuraClaim) {
                        dispatch.auth.updateAuthState({ ...reduxAuthState, user, isAuth: true, token });
                    } else {
                        throw Error('Signup Failed');
                    }
                })
                .catch(error => console.log(error));
        }
    };

    const signout = async () => {
        return firebaseApp
            .auth()
            .signOut()
            .then(() => {
                dispatch.auth.updateAuthState({ ...reduxAuthState, isAuth: false, user: null, token: null });
                location.replace('/signin');
                localStorage.clear();
            })
            .catch(error => console.log(error));
    };

    const sendPasswordResetEmail = async (email: string) => {
        return firebaseApp.auth().sendPasswordResetEmail(email);
    };

    const verifyPasswordCode = async (code: string) => {
        return firebaseApp.auth().verifyPasswordResetCode(code);
    };

    const confirmPasswordReset = async (code: string, password: string) => {
        return firebaseApp.auth().confirmPasswordReset(code, password);
    };

    const handleSignIn = async (data: any) => {
        const isNewUser = data.additionalUserInfo?.isNewUser;
        const token = await data?.user?.getIdToken(true);
        const to = isNewUser ? '/onboarding-update' : '/dashboard';
        localStorage.setItem(LOCAL_STORAGE_KEY.TOKEN, token);
        dispatch.auth.updateAuthState({ ...reduxAuthState, isAuth: true, isError: false, isLoading: false });
        location.replace(to);
    };

    const signInWithGoogle = async () => {
        const googleProvider = new firebaseApp.auth.GoogleAuthProvider();
        return firebaseApp
            .auth()
            .signInWithPopup(googleProvider)
            .then(async data => {
                handleSignIn(data);
            })
            .catch(({ message }: Record<string, string>): void => {
                dispatch.auth.updateAuthState({ ...reduxAuthState, isAuth: false, isError: true, isLoading: false });
                setAuthError(message);
            });
    };

    const signInWithFacebook = async () => {
        const FacebookAuthProvider = new firebaseApp.auth.FacebookAuthProvider();
        return firebaseApp
            .auth()
            .signInWithPopup(FacebookAuthProvider)
            .then(async data => {
                handleSignIn(data);
            })
            .catch(({ message }: Record<string, string>): void => {
                dispatch.auth.updateAuthState({ ...reduxAuthState, isAuth: false, isError: true, isLoading: false });
                setAuthError(message);
            });
    };

    const signinWithEmailPassword = async (email: string, password: string) => {
        return firebaseApp
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(async data => {
                handleSignIn(data);
            })
            .catch(({ message }: Record<string, string>): void => {
                dispatch.auth.updateAuthState({ ...reduxAuthState, isAuth: false, isError: true, isLoading: false });
                setAuthError(message);
            });
    };

    const verifyEmail = async (actionCode: string) => {
        return firebaseApp.auth().applyActionCode(actionCode);
    };

    useEffect(() => {
        const unsubscribe = firebaseApp.auth().onAuthStateChanged(async user => {
            if (user) {
                const token = await user.getIdToken(true);
                const idTokenResult = await user.getIdTokenResult();
                const hasuraClaim = idTokenResult.claims[HASURA_CLAIMS_URL];

                if (hasuraClaim) {
                    dispatch.auth.updateAuthState({ ...reduxAuthState, user, isAuth: true });
                    localStorage.setItem(LOCAL_STORAGE_KEY.TOKEN, token);
                } else {
                    // Check if refresh is required.
                    const metadataRef = firebaseApp.database().ref('metadata/' + user.uid + '/refreshTime');

                    metadataRef.on('value', async (data: any) => {
                        if (!data.exists) return;
                        // Force refresh to pick up the latest custom claims changes.
                        const newToken = await user.getIdToken(true);
                        dispatch.auth.updateAuthState({ ...reduxAuthState, user, isAuth: true });
                        localStorage.setItem(LOCAL_STORAGE_KEY.TOKEN, newToken);
                    });
                }
            } else {
                dispatch.auth.updateAuthState({ ...reduxAuthState, user: null, isAuth: false, token: null });
                localStorage.removeItem(LOCAL_STORAGE_KEY.TOKEN);
            }
        });
        return () => unsubscribe();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {
        authError,
        confirmPasswordReset,
        handleUpdateFirebaseProfile,
        sendPasswordResetEmail,
        setAuthError,
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
