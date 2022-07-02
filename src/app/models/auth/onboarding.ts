import { createModel } from '@rematch/core';

import { RootModel } from '../index';
import { StepLabel } from 'features/onboarding/initial-preferences/steps/index';

interface APIFetchState {
    result?: 'error' | 'success';
    type?: string;
    message?: string;
    loading?: boolean;
}
interface OnboardingPreference {
    phoneNumber: string;
    address: string;
    activeStep: StepLabel;
    disableNext: boolean;
    isPhoneVerified: boolean;
    displayName: string;
    verificationId: string;
    apiFetchState: APIFetchState;
    document_url: string | null;
    isNewUser: boolean;
    country: string;
}

const initialState: OnboardingPreference = {
    phoneNumber: '',
    address: '',
    displayName: '',
    activeStep: 'phone',
    disableNext: true,
    verificationId: '',
    apiFetchState: {},
    isPhoneVerified: false,
    document_url: null,
    isNewUser: false,
    country: 'ng'
};

export const onboarding = createModel<RootModel>()({
    state: initialState,
    reducers: {
        setActiveStep(state, payload: StepLabel) {
            return { ...state, activeStep: payload };
        },
        setDisableNext(state, payload: boolean) {
            return { ...state, disableNext: payload };
        },
        setPhoneNumber(state, payload: string) {
            return { ...state, phoneNumber: `+${payload}`, isNewUser: true };
        },
        setAddress(state, payload: string) {
            return { ...state, address: payload, isNewUser: false };
        },
        setCountry(state, payload: OnboardingPreference['country']) {
            return { ...state, country: payload };
        },
        setVerificationId(state, payload: string) {
            return { ...state, verificationId: payload };
        },
        setPhoneVerified(state, payload: boolean) {
            return { ...state, isPhoneVerified: payload };
        },
        setApiFetchState(state, payload: APIFetchState) {
            return { ...state, apiFetchState: payload };
        },
        setDocumentUrl(state, payload: string) {
            return { ...state, document_url: payload };
        },
        setDisplayName(state, payload: string) {
            return { ...state, displayName: payload };
        }
    }
});
