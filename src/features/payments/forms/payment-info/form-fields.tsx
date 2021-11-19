import * as yup from 'yup';
import { NativeSelect } from '@mui/material';
import { TextField, InputLabel } from '@material-ui/core';

import { Country, State, City } from 'country-state-city';
import { transformCase } from 'libs';
import { Key } from 'react';
interface PaymentInfo {
    label: string;
    name: string;
    typePicker?: string;
    type?: 'text' | 'textArea' | 'select' | 'checkbox' | 'email' | 'number';
    yupType?: 'string' | 'email' | 'bool';
    errorMessage?: string;
    isOptional: boolean;
    items?: string[];
    picker?: any;
    selector?: boolean;
    helperText?: string;
    defVal?: string;
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
        label: 'Full Name',
        name: 'fullname',
        errorMessage: 'Enter your full name',
        isOptional: false
    },
    {
        label: 'Address',
        name: 'address',
        errorMessage: 'Please Enter your a valid Address',
        isOptional: false
    },
    {
        label: 'Country',
        name: 'country',
        typePicker: 'country',
        errorMessage: 'Please select country',
        isOptional: false,
        selector: true
    },
    {
        label: 'State',
        name: 'state',
        typePicker: 'state',
        errorMessage: 'Please select a state',
        isOptional: false,
        selector: true
    },
    {
        label: 'City',
        name: 'city',
        errorMessage: 'Please select city',
        isOptional: false,
        selector: true
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
        helperText: 'Enter information such as invoice ID etc',
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
const phoneRegExp = /^\+(?:[0-9] ?){6,14}[0-9]$/;

export const validationSchema = yup.object().shape({
    fullname: yup.string().required('Enter a your family name'),
    address: yup.string().required('Enter your Address '),
    country: yup.string().required('Enter your country. This is for data compliance purpose only.'),
    city: yup.string().required('Enter your city. This is for data compliance purpose only.'),
    phone: yup.string().matches(phoneRegExp, 'Phone number is not valid').required('Enter a valid phone number.'),
    references: yup.string().required('This is where you enter details about the payment'),
    by: yup.string().oneOf(['self', 'others'], 'Please select one'),
    purpose: yup
        .string()
        .oneOf(['medical', 'education', 'software', 'mortgage', 'family_and_friends', 'school_fees', 'others'], 'Please select one')
        .required('This is where you enter details about the payment')
});
interface generateInput {
    props: any;
    option: PaymentInfo;
    isError?: boolean;
    handler: Record<string, string>;
}

export const generateInputType = ({ props, option, isError, handler }: generateInput) => {
    console.log(handler);

    if (option?.type === 'select') {
        const label = option.name === 'by' ? `Who's making payment` : `Select Purpose`;
        const defaultValue: PURPOSE | BY_WHOM = option.name === 'by' ? 'self' : 'education';
        return (
            <>
                <InputLabel id={label}>{label}</InputLabel>
                <NativeSelect label={label} labelId='' id={label} {...props} name={option?.name} style={{ width: '100%' }}>
                    <option key={''} value={'Select one'} defaultValue={'Select one'}>
                        {''}
                    </option>
                    {option?.items?.map(item => (
                        <option key={item} value={item} defaultValue={defaultValue}>
                            {transformCase(item)}
                        </option>
                    ))}
                </NativeSelect>
            </>
        );
    } else if (option?.selector === true) {
        if (option?.typePicker === 'country') {
            return (
                <>
                    <InputLabel id={option?.label}>{option?.label}</InputLabel>
                    <NativeSelect label={option?.label} labelId='' id={option?.label} {...props} name={option?.name} style={{ width: '100%' }}>
                        <option key={''} value={'Select country'} defaultValue={'Select country'}>
                            {''}
                        </option>

                        {Country.getAllCountries()?.map((item: any) => (
                            <option key={item.isoCode} value={item.isoCode}>
                                {transformCase(item.name)}
                            </option>
                        ))}
                    </NativeSelect>
                </>
            );
        } else if (option?.typePicker === 'state') {
            return (
                <>
                    <InputLabel id={option?.label}>{option?.label}</InputLabel>
                    <NativeSelect label={option?.label} labelId='' id={option?.label} {...props} name={option?.name} style={{ width: '100%' }}>
                        <option key={''} value={'Select state'} defaultValue={'Select state'}>
                            {''}
                        </option>
                        {State.getStatesOfCountry(handler?.country)?.map((item: any) => (
                            <option key={item.name} value={item.isCode}>
                                {transformCase(item.name)}
                            </option>
                        ))}
                    </NativeSelect>
                </>
            );
        } else {
            return (
                <>
                    <InputLabel id={option?.label}>{option?.label}</InputLabel>
                    <NativeSelect label={option?.label} labelId='' id={option?.label} {...props} name={option?.name} style={{ width: '100%' }}>
                        <option key={''} value={'Select city'} defaultValue={'Select city'}>
                            {''}
                        </option>
                        {City.getCitiesOfCountry(handler?.country)?.map((item: any) => (
                            <option key={item.name} value={item.name}>
                                {transformCase(item.name)}
                            </option>
                        ))}
                    </NativeSelect>
                </>
            );
        }
    } else {
        return (
            <TextField
                fullWidth
                id={option?.label}
                name={option?.name}
                defaultValue={option?.defVal}
                label={option?.label}
                type={option?.type ?? 'text'}
                {...props}
                FormHelperTextProps={{
                    className: isError ? '' : 'info'
                }}
            />
        );
    }
};
