import { Button, Slide, Stack } from '@mui/material';
import { Dispatch } from 'app/store';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import PhoneInput from 'react-phone-input-2';

import 'react-phone-input-2/lib/style.css';
export const PhoneNumber = () => {
    const [phone] = useState('');
    const dispatch = useDispatch<Dispatch>();

    const handleDispatchPhoneNumberUpdated = () => {
        dispatch.onboarding.setActiveStep('country');
    };

    return (
        <Slide direction='right' in={true} mountOnEnter unmountOnExit appear timeout={800}>
            <Stack>
                <PhoneInput country={'us'} value={phone} onChange={phone => dispatch.onboarding.setPhoneNumber(phone)} />

                <Button onClick={handleDispatchPhoneNumberUpdated} variant={'contained'} color={'primary'} style={{ marginTop: 20 }}>
                    Continue
                </Button>
            </Stack>
        </Slide>
    );
};
