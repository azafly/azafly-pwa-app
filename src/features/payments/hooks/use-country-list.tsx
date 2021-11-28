import axios from 'axios';
import { useEffect, useState } from 'react';

interface Currency {
    code: string;
    name: string;
    symbol: string;
}

export interface Country {
    name: string;
    emoji: string;
    currency: Currency;
    code: string;
    region: string;
    isComingSoon: boolean;
    isNotSupported: boolean;
    isPopular: boolean;
    symbol?: string;
    phone?: string;
    flag?: string;
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
    currentlySupportedCountries: Country[];
    isLoadingCountryList: boolean;
}

export const NIGERIA: Country = {
    name: 'Nigeria',
    currency: {
        code: 'NGN',
        name: 'Nigerian naira',
        symbol: '₦'
    },
    emoji: '🇳🇬',
    code: 'NG',
    region: 'AF',
    isNotSupported: false,
    isComingSoon: false,
    isPopular: true,
    phone: '',
    flag: ''
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
    },
    currentlySupportedCountries: [],
    isLoadingCountryList: false
};

export const useCountryList = (): CountryListData => {
    const [countryList, setCountryList] = useState<CountryListData>(defaultCountryListData);
    const [isLoadingCountryList, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        const URL = `${process.env.REACT_APP_FUNCTIONS_BASE_URL}/countryList`;
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
