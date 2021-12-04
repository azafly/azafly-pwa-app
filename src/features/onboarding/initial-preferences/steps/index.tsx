import { Address } from './address';
import { CurrencyPair } from './currency-pair/currency-pair';
import { KYCDocs } from './kyc-docs-upload';
import { PhoneNumber } from './phone-number';
import { CountryOfResidence } from './country';
import { PhoneVerification } from './phone-verification';

export const steps = {
    phone: {
        name: 'phone',
        text: 'Enter Phone Number',
        next: 'verification',
        prev: null,
        index: 0,
        component: <PhoneNumber />
    },
    verification: {
        name: 'verification',
        text: 'Enter Phone Number',
        next: 'country',
        prev: 'phone',
        index: 1,
        component: <PhoneVerification />
    },
    country: {
        name: 'country',
        index: 2,
        prev: 'verification',
        text: 'Country of primary residence',
        next: 'currencies',
        component: <CountryOfResidence />
    },

    currencies: {
        name: 'currencies',
        text: 'CurrencyPair',
        next: 'address',
        prev: 'country',
        index: 3,
        component: <CurrencyPair />
    },
    address: {
        name: 'address',
        text: 'Enter Address',
        next: 'kyc',
        index: 4,
        prev: 'currencies',
        component: <Address />
    },
    kyc: {
        name: 'kyc',
        text: ' KYCDocs ',
        next: null,
        index: 5,
        prev: 'address',
        component: <KYCDocs />
    }
};

export type StepLabel = keyof typeof steps;
