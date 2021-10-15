import * as yup from 'yup';
import { NativeSelect } from '@mui/material';
import { TextField, InputLabel } from '@material-ui/core';

import { transformCase } from 'utils';
interface PaymentInfo {
    label: string;
    name: string;
    type?: 'text' | 'textArea' | 'select' | 'checkbox' | 'email' | 'number';
    yupType?: 'string' | 'email' | 'bool';
    errorMessage?: string;
    information?: string;
    isOptional: boolean;
    items?: string[];
}
export type BY_WHOM = 'self' | 'others';

export const byWhom: Record<string, BY_WHOM> = {
    self: 'self',
    OTHERS: 'others'
};

export type PURPOSE = 'medical' | 'education' | 'software' | 'mortgage' | 'family_and_friends' | 'school_fees' | 'others';

export const purpose: Record<string, PURPOSE> = {
    medical: 'medical',
    education: 'education',
    software: 'software',
    mortgage: 'mortgage',
    family_and_friends: 'family_and_friends',
    school_fees: 'school_fees',
    others: 'others'
};

export const PAYMENT_INFO: PaymentInfo[] = [
    {
        label: 'First name',
        name: 'first_name',
        errorMessage: 'Please Enter your First name',
        isOptional: false
    },
    {
        label: 'Family Name',
        name: 'family_name',
        errorMessage: 'Please Enter your Last Name',
        isOptional: false
    },
    {
        label: 'Middle name',
        name: 'middle_name',
        isOptional: true
    },
    {
        label: 'Address',
        name: 'address',
        errorMessage: 'Please Enter your a valid Address',
        isOptional: false
    },
    {
        label: 'City',
        name: 'city',
        errorMessage: 'Please select city',
        isOptional: false
    },
    {
        label: 'State',
        name: 'state',
        errorMessage: 'Please select a state',
        isOptional: false
    },
    {
        label: 'Phone number',
        name: 'phone',
        errorMessage: 'Please enter a valid phone number',
        isOptional: false
    },
    {
        label: 'References',
        name: 'references',
        type: 'textArea',
        errorMessage: 'Reference is compulsory for remittance',
        information: 'Enter information such as invoice ID etc',
        isOptional: false
    },
    {
        label: 'By Whom',
        name: 'by',
        type: 'select',
        errorMessage: 'Please select who is making this payment',
        isOptional: false,
        items: Object.values(byWhom)
    },
    {
        label: 'Terms and Condition',
        name: 'terms',
        type: 'checkbox',
        yupType: 'bool',
        isOptional: false
    },
    {
        label: 'Purpose',
        name: 'purpose',
        type: 'select',
        isOptional: false,
        items: Object.values(purpose)
    }
];

export const initialValues = () => {
    const values: Record<string, string> = {};
    PAYMENT_INFO.forEach(({ name }) => {
        values[name] = '';
    });
    return values;
};

export const validationSchema = yup.object().shape({
    first_name: yup.string().required('Enter a your first name'),
    family_name: yup.string().required('Enter a your family name'),
    address: yup.string().required('Enter your Address '),
    city: yup.string().required('Enter your city. This is for data compliance purpose only.'),
    state: yup.string().required('Enter your State This is for data compliance purpose only.'),
    phone: yup.string().required('Enter a valid phone number.'),
    references: yup.string().required('This is where you enter details about the payment'),
    terms: yup.bool().oneOf([true], 'Accept Terms & Conditions is required').required('Accept Terms & Conditions is required'),
    by: yup.string().required('This is where you enter details about the payment'),
    purpose: yup
        .string()
        .oneOf(['medical', 'education', 'software', 'mortgage', 'family_and_friends', 'school_fees', 'others'], 'Please select one')
        .required('This is where you enter details about the payment')
});

export const generateInputType = (props: any, option: PaymentInfo) => {
    if (option?.type === 'select') {
        const label = option.name === 'by' ? `Who's making payment` : `Select Purpose`;
        const defaultValue: PURPOSE | BY_WHOM = option.name === 'by' ? 'self' : 'education';
        return (
            <>
                <InputLabel id={label}>{label}</InputLabel>
                <NativeSelect label={label} labelId='' id={label} {...props} name={option?.name} style={{ width: '100%' }}>
                    {option?.items?.map(item => (
                        <option key={item} value={item} defaultValue={defaultValue}>
                            {transformCase(item)}
                        </option>
                    ))}
                </NativeSelect>
            </>
        );
    } else {
        return <TextField fullWidth id={option?.label} name={option?.name} label={option?.label} type={option?.type ?? 'text'} {...props} />;
    }
};
