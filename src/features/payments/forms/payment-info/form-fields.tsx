import * as yup from 'yup';
import { NativeSelect } from '@mui/material';
import { TextField, InputLabel } from '@material-ui/core';

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

export const byWhom: Record<string, string> = {
    self: 'My self',
    OTHERS: 'Paying for a 3rd party'
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

export const validationSchema = yup.object().shape({
    by: yup.string().oneOf(['My self', 'Paying for a 3rd party'], 'Please select one'),
    references: yup.string().required('Enter a reference info. Like an invoice ID '),
    purpose: yup
        .string()
        .oneOf(['medical', 'education', 'software', 'mortgage', 'family_and_friends', 'school_fees', 'others'], 'Please select one')
        .required('This is where you enter details about the payment')
});

interface generateInput {
    props: any;
    option: PaymentInfo;
    isError?: boolean;
    defaultValue: string;
}

export const generateInputType = ({ props, option, isError, defaultValue }: generateInput) => {
    if (option?.type === 'select') {
        switch (option.picker) {
            case 'by':
            case 'purpose':
                const label = option.name === 'by' ? `Who's making payment` : `Select Purpose`;
                return (
                    <>
                        <InputLabel id={label}>{label}</InputLabel>
                        <NativeSelect
                            label={label}
                            labelId=''
                            id={label}
                            {...props}
                            name={option?.name}
                            style={{ width: '100%' }}
                            value={defaultValue}
                        >
                            <option key={''} value={'Select one'}>
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
                label={option?.label}
                value={defaultValue || ''}
                type={option?.type ?? 'text'}
                {...props}
                rows={2}
                multiline
                variant='outlined'
                FormHelperTextProps={{
                    className: isError ? '' : 'info'
                }}
            />
        );
    }
};
