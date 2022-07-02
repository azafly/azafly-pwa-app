import { Address } from './address';
import { KYCDocuments } from './kyc-docs-upload';
import { PhoneNumber } from './phone-number';
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
        next: 'address',
        prev: 'phone',
        index: 1,
        component: <PhoneVerification />
    },
    address: {
        name: 'address',
        text: 'Enter Address',
        next: 'kyc',
        index: 2,
        prev: 'verification',
        component: <Address />
    },
    kyc: {
        name: 'kyc',
        text: ' KYCDocuments ',
        next: null,
        index: 3,
        prev: 'address',
        component: <KYCDocuments />
    }
};

export type StepLabel = keyof typeof steps;
