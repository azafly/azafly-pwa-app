import { useMemo } from 'react';
import useCountries from "use-countries";
import { currencies } from './currency-symbols-encoded'

export interface Country {
    name: string
    currency: string
    emoji: string
    code: string
    isComingSoon: boolean
    isNotSupported: boolean
    isPopular: boolean
    symbol?: string
}

const COMING_SOON_CURRENCIES = {
    GHS: true,
    KES: true,
}

const CURRENT_SUPPORTED_CURRENCIES = {
    NGN: true,
}

const POPULAR_CURRENCIES = {
    USD: true,
    EUR: true,
    GBP: true,
    CAD: true,
    ZAR: true,
    PLN: true,
    RUB: true,
    AUD: true
}

const getCurrencySymbol = (countryCode?: string) => `&#66;&#90;&#36;`

export const useCountryList = () => {
    const { countries } = useCountries();

    const formattedCountries: Country[] = countries.map(({ name, currency, emoji, code }) => ({
        name,
        currency,
        emoji,
        code,
        isComingSoon: COMING_SOON_CURRENCIES[currency as keyof typeof COMING_SOON_CURRENCIES],
        isPopular: POPULAR_CURRENCIES[currency as keyof typeof POPULAR_CURRENCIES],
        isNotSupported: false
    }))

    const popularCurrencies = useMemo(() => formattedCountries.filter(({ isPopular, }) => isPopular === true), [])

    const topSources = useMemo(() => {
        return formattedCountries.filter(({ currency, isComingSoon }) => isComingSoon === true || CURRENT_SUPPORTED_CURRENCIES[currency as keyof typeof CURRENT_SUPPORTED_CURRENCIES])
    }, [])

    const NIGERIA = topSources.filter(({ currency }) => currency === 'NGN')[0]
    const currency = useMemo(() => '$', [])


    return {
        popularCurrencies,
        topSources,
        NIGERIA,
        currency,
        formattedCountries
    }
}
