import { Address } from './address';
import { CurrencyPair } from './currency-pair/currency-pair';
import { KYCDocs } from './kyc-docs-upload';
import { PhoneNumber } from './phone-number';

export const steps = [
    {
        label: 'Phone',
        text: 'Enter Phone Number',
        next: 'Country',
        component: <PhoneNumber />
    },
    {
        label: 'Address',
        text: 'Enter Address',
        next: 'Address',
        component: <Address />
    },
    {
        label: 'CurrencyPair',
        text: 'CCurrencyPair',
        next: 'CurrencyPair',
        component: <CurrencyPair />
    },
    {
        label: ' KYCDocs ',
        text: ' KYCDocs ',
        next: ' KYCDocs ',
        component: <KYCDocs />
    }
];
