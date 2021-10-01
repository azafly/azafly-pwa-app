import axios from 'axios';
import { useEffect, useState } from 'react';

interface Currency {
    code: string;
    name: string;
    symbol: string;
}

export interface Country {
    name: string;
    currency: Currency;
    flag: string;
    code: string;
    region: string;
    isComingSoon: boolean;
    isNotSupported: boolean;
    isPopular: boolean;
    symbol?: string;
}

export interface CountriesByRegion {
    Africa: Country[];
    North_America: Country[];
    Oceania: Country[];
    Antarctica: Country[];
    Asia: Country[];
    Europe: Country[];
    South_America: Country[];
}

interface CountryListData {
    popularTargetCountries: Country[];
    popularSourceCountries: Country[];
    NIGERIA: Country;
    formattedCountries: Country[];
    countriesByRegion: CountriesByRegion;
}

export const NIGERIA: Country = {
    name: 'Nigeria',
    currency: {
        code: 'NGN',
        name: 'Nigerian naira',
        symbol: '₦'
    },
    flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/NG.svg',
    code: 'NG',
    region: 'AF',
    isNotSupported: false,
    isComingSoon: false,
    isPopular: true
};

const defaultCountryListData: CountryListData = {
    popularTargetCountries: [],
    popularSourceCountries: [],
    NIGERIA,
    formattedCountries: [],
    countriesByRegion: {
        Africa: [],
        North_America: [],
        Oceania: [],
        Antarctica: [],
        Asia: [],
        Europe: [],
        South_America: []
    }
};
export const useCountryList = (): CountryListData => {
    const [countryList, setCountryList] = useState<CountryListData>(defaultCountryListData);
    useEffect(() => {
        const URL = `${process.env.REACT_APP_FUNCTIONS_BASE_URL}/countryList`;
        axios
            .get(URL)
            .then(({ data }) => setCountryList(data))
            .catch(error => {
                console.warn(error);
                setCountryList(defaultCountryListData);
            });
    }, []);

    return countryList;
};
