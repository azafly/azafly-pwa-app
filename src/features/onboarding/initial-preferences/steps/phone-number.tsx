import { Box } from '@mui/system';
import { Dispatch } from 'app/store';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import PhoneInput from 'react-phone-input-2';

import 'react-phone-input-2/lib/style.css';
export const PhoneNumber = () => {
    const [phone] = useState('');
    const dispatch = useDispatch<Dispatch>();

    return (
        <Box>
            <PhoneInput country={'us'} value={phone} onChange={phone => dispatch.onboarding.setPhoneNumber(phone)} />;
        </Box>
    );
};
