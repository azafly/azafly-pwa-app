import axios from 'axios';
import { useEffect, useState } from 'react';
import { CountryListData, defaultCountryListData } from 'types/country-data';
import { ENV, getEnv } from 'format-env';

export const useCountryList = (): CountryListData => {
    const [countryList, setCountryList] = useState<CountryListData>(defaultCountryListData);
    const [isLoadingCountryList, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        const URL = `${getEnv(ENV.REACT_APP_FUNCTIONS_BASE_URL)}/countryList`;
        axios
            .get(URL)
            .then(({ data }) => {
                setLoading(false);
                setCountryList(data);
            })
            .catch(error => {
                console.warn(error);
                setLoading(false);
                return [];
            });
    }, []);

    return { ...countryList, isLoadingCountryList };
};
