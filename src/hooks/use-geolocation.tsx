import { useEffect, useReducer } from 'react';
import axios from 'axios';

interface LocationProps {
    isLoading: boolean;
    userCurrentCountry?: any;
    isAfrica?: boolean;
    error?: string;
}

const initialState = { isLoading: false, userCurrentCountry: null };

type Action = { type: 'request' } | { type: 'success'; payload: Omit<LocationProps, 'isLoading'> } | { type: 'failure'; error?: string };

const geolocationReducer = (state: LocationProps = initialState, action: Action): LocationProps => {
    switch (action.type) {
        case 'request':
            return { isLoading: true };
        case 'success':
            return { isLoading: false, userCurrentCountry: action.payload.userCurrentCountry, isAfrica: action.payload.isAfrica };
        case 'failure':
            return { isLoading: false, error: 'Error getting location' };
        default:
            return state;
    }
};

const useGeolocation = () => {
    const [location, dispatch] = useReducer(geolocationReducer, initialState);

    const getCountriesByRegion = async () =>
        axios.get(`https://us-central1-pick-safe.cloudfunctions.net/countryList`).then(({ data }) => data.countriesByRegion);

    const getUserGeoLocationData = async () =>
        axios.get(`https://geolocation-db.com/json/${process.env.GEOLOCATION_KEY}`).then(({ data }) => data.country_name);

    const getUserGeolocationDetails = async () => {
        dispatch({ type: 'request' });
        try {
            const [countriesByRegion, userCurrentCountry] = await Promise.all([getCountriesByRegion(), getUserGeoLocationData()]);
            const isAfrica = userCurrentCountry in countriesByRegion.Africa;
            dispatch({ type: 'success', payload: { isAfrica, userCurrentCountry } });
        } catch (error) {
            dispatch({ type: 'failure' });
        }
    };

    useEffect(() => {
        getUserGeolocationDetails();
    }, []);

    return {
        location
    };
};

export default useGeolocation;