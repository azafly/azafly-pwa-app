import { Slide, Stack, Typography } from '@mui/material';
import { Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import PhoneInput from 'react-phone-input-2';

import { Dispatch, RootState } from 'app/store';
import { sendAuthSMS } from 'providers/auth/firebase/phone-verification';

import 'react-phone-input-2/lib/style.css';

export const PhoneNumber = () => {
    const dispatch = useDispatch<Dispatch>();
    const { phoneNumber, country } = useSelector((state: RootState) => state.onboarding);
    const { user } = useSelector((state: RootState) => state.auth);

    const handleDispatchPhoneNumberUpdated = () => {
        sendAuthSMS(user, phoneNumber)
            .then(data => {
                console.log(data);
                dispatch.onboarding.setActiveStep('verification');
            })
            .catch(error => console.log(error));
    };

    const handleSendVerificationCode = () => {};
    return (
        <Slide direction='up' in={true} mountOnEnter unmountOnExit appear timeout={800}>
            <Stack sx={{ width: '100%' }}>
                <Typography variant={'h6'} align={'center'} style={{ fontWeight: 700, fontFamily: 'Nunito', color: '#0d324d', marginBottom: 10 }}>
                    {' '}
                    Verify your phone number with a code
                </Typography>
                <Typography align={'center'} paragraph style={{ fontWeight: 400, fontFamily: 'Nunito', color: '#0d324d', marginBottom: 20 }}>
                    It helps us keep your account secure.
                </Typography>
                <PhoneInput
                    inputProps={{
                        name: 'phone',
                        required: true,
                        autoFocus: true
                    }}
                    country={country?.code.toLocaleLowerCase() ?? 'us'}
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
                    Send verification code
                </Button>
            </Stack>
        </Slide>
    );
};
