import * as yup from 'yup';
import { NativeSelect, TextareaAutosize } from '@mui/material';
import { TextField, InputLabel } from '@material-ui/core';

import { GoogleAddressAutoComplete } from 'components';
import { transformCase } from 'libs';
interface PaymentInfo {
    label: string;
    name: string;
    picker?: string;
    type?: 'text' | 'textArea' | 'select' | 'checkbox' | 'email' | 'number' | 'autocomplete' | 'phone';
    yupType?: 'string' | 'email' | 'bool';
    errorMessage?: string;
    isOptional: boolean;
    items?: string[];
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
        isOptional: false,
        type: 'text'
    },
    {
        label: 'Address',
        name: 'address',
        errorMessage: 'Please Enter your a valid Address',
        isOptional: false,
        type: 'autocomplete'
    },

    {
        label: 'Phone number',
        name: 'phone',
        errorMessage: 'Please enter a valid phone number',
        helperText: 'Phone number with area code e.g +4912345678',
        isOptional: false,
        type: 'text'
    },
    {
        label: 'References',
        name: 'references',
        type: 'text',
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
        picker: 'by',
        items: Object.values(byWhom)
    },
    {
        label: 'Purpose',
        name: 'purpose',
        type: 'select',
        picker: 'purpose',
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
    phone: yup.string().matches(phoneRegExp, 'Phone number is not valid').required('This is not a valid phone number.'),
    references: yup.string().required('Reference is necessary to track your payment'),
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
    setAddressValue: any;
}

export const generateInputType = ({ props, option, isError, setAddressValue }: generateInput) => {
    if (option?.type === 'select') {
        switch (option.picker) {
            case 'by':
            case 'purpose':
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
            default:
                break;
        }
    } else if (option.type == 'text') {
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
    } else if (option.type === 'textArea') {
        return (
            <TextareaAutosize
                maxRows={4}
                id={option?.label}
                name={option?.name}
                defaultValue={option?.defVal}
                aria-label='maximum height'
                placeholder='Maximum 4 rows'
                style={{ width: '100%' }}
            />
        );
    } else if (option.type === 'autocomplete') {
        return <GoogleAddressAutoComplete />;
    }
};
