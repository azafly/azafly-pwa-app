import axios from 'axios';
import { createModel } from '@rematch/core';

import { Country } from 'features/payments/hooks/use-country-list';
import { CountryListData, defaultCountryListData } from 'types/country-data';
import { RootModel } from './index';
import { UK } from 'features/payments/context/constants';

interface OnboardingPreference {
    phoneNumber: string;
    currencies: Record<string, string>[];
    country: Country | null;
    address: string;
    countryList: CountryListData;
    userGeolocation: any;
}

const initialState: OnboardingPreference = {
    phoneNumber: '',
    currencies: [],
    country: UK,
    address: '1 Waffle street, Nigeria',
    countryList: defaultCountryListData,
    userGeolocation: {}
};

export const onboarding = createModel<RootModel>()({
    state: initialState,
    reducers: {
        setPhoneNumber(state, payload: string) {
            return { ...state, phoneNumber: payload };
        },
        setAddress(state, payload: string) {
            return { ...state, address: payload };
        },
        setCurrencies(state, payload: OnboardingPreference['currencies']) {
            return { ...state, currencies: payload };
        },
        setCountry(state, payload: Country | null) {
            return { ...state, country: payload };
        },
        setCountryList(state, payload: CountryListData) {
            return { ...state, countryList: payload };
        },
        setUserGeolocation(state, payload: any) {
            return { ...state, userGeolocation: payload };
        }
    },
    effects: dispatch => ({
        async fetchCountryList() {
            try {
                const URL = `${process.env.REACT_APP_FUNCTIONS_BASE_URL}/countryList`;
                const { data } = await axios.get(URL);
                dispatch.onboarding.setCountryList(data);
            } catch (error) {}
        },
        async getUserGeoLocationData() {
            try {
                const { data } = await axios.get(`https://geolocation-db.com/json/${process.env.GEOLOCATION_KEY}`);
                dispatch.onboarding.setUserGeolocation(data);
            } catch (error) {}
        }
    })
});
