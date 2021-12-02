import { Address } from './address';
import { CurrencyPair } from './currency-pair/currency-pair';
import { KYCDocs } from './kyc-docs-upload';
import { PhoneNumber } from './phone-number';
import { CountryOfResidence } from './country';

export const steps = {
    phone: {
        name: 'phone',
        text: 'Enter Phone Number',
        next: 'country',
        prev: null,
        index: 0,
        component: <PhoneNumber />
    },
    country: {
        name: 'country',
        index: 1,
        prev: 'phone',
        text: 'Country of primary residence',
        next: 'currencyPair',
        component: <CountryOfResidence />
    },

    currencyPair: {
        name: 'currencyPair',
        text: 'CCurrencyPair',
        next: 'address',
        prev: 'country',
        index: 3,
        component: <CurrencyPair />
    },
    address: {
        name: 'address',
        text: 'Enter Address',
        next: 'kyc',
        index: 2,
        prev: 'currencyPair',
        component: <Address />
    },
    kyc: {
        name: 'kyc',
        text: ' KYCDocs ',
        next: null,
        index: 4,
        prev: 'address',
        component: <KYCDocs />
    }
};

export type StepLabel = keyof typeof steps;
