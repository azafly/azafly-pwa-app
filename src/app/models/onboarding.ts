import { createModel } from '@rematch/core';

import { Country } from 'features/payments/hooks/use-country-list';
import { CountryListData, defaultCountryListData } from 'types/country-data';
import { Currency } from 'libs/constants';
import { RootModel } from './index';
import { StepLabel } from 'features/onboarding/initial-preferences/steps/index';
import { UK } from 'features/payments/context/constants';

interface OnboardingPreference {
    phoneNumber: string;
    currencies: Currency[];
    country: (Country & { isAfrica?: boolean }) | null;
    address: string;
    countryList: CountryListData;
    userGeolocation: any;
    activeStep: StepLabel;
    disableNext: boolean;
    isFirstTimeUser: boolean;
}

const initialState: OnboardingPreference = {
    phoneNumber: '',
    currencies: [],
    country: UK,
    address: '',
    countryList: defaultCountryListData,
    userGeolocation: {},
    activeStep: 'phone',
    disableNext: true,
    isFirstTimeUser: true
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
            return { ...state, phoneNumber: `+${payload}`, disableNext: payload.length < 3 };
        },
        setAddress(state, payload: string) {
            return { ...state, address: payload };
        },
        setCurrencies(state, payload: OnboardingPreference['currencies']) {
            return { ...state, currencies: payload };
        },
        setCountry(state, payload: OnboardingPreference['country']) {
            return { ...state, country: payload };
        },
        setCountryList(state, payload: OnboardingPreference['countryList']) {
            return { ...state, countryList: payload };
        },
        setUserGeolocation(state, payload: any) {
            return { ...state, userGeolocation: payload };
        },
        setDerivedCountryOfResidence(state, payload: OnboardingPreference['country']) {
            return { ...state, country: payload };
        },
        setIsFirstTimeUser(state, payload: boolean) {
            return { ...state, isFirstTimeUser: payload };
        }
    }
});
