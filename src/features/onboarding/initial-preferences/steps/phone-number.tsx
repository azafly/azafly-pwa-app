import { Slide, Stack, Typography } from '@mui/material';
import { Button } from '@material-ui/core';
import { Dispatch } from 'app/store';
import { useDispatch, useSelector } from 'react-redux';
import PhoneInput from 'react-phone-input-2';

import { RootState } from 'app/store';

import 'react-phone-input-2/lib/style.css';

export const PhoneNumber = () => {
    const dispatch = useDispatch<Dispatch>();
    const { phoneNumber } = useSelector((state: RootState) => state.onboarding);

    const handleDispatchPhoneNumberUpdated = () => {
        dispatch.onboarding.setActiveStep('country');
    };

    return (
        <Slide direction='up' in={true} mountOnEnter unmountOnExit appear timeout={800}>
            <Stack sx={{ width: '100%' }}>
                <Typography variant={'h5'} align={'center'} style={{ fontWeight: 700, fontFamily: 'Nunito', color: '#0d324d', marginBottom: 10 }}>
                    {' '}
                    Verify your phone number with a code
                </Typography>
                <Typography align={'center'} paragraph style={{ fontWeight: 400, fontFamily: 'Nunito', color: '#0d324d', marginBottom: 20 }}>
                    It helps us keep your account secure. Learn more
                </Typography>
                <PhoneInput
                    country={'us'}
                    value={phoneNumber}
                    onChange={phone => dispatch.onboarding.setPhoneNumber(phone)}
                    regions={['america', 'europe', 'oceania', 'africa']}
                />

                <Button
                    onClick={handleDispatchPhoneNumberUpdated}
                    variant={'contained'}
                    color={'primary'}
                    style={{ marginTop: 20 }}
                    disabled={phoneNumber.length < 3}
                >
                    Continue
                </Button>
            </Stack>
        </Slide>
    );
};
