import { useState, useEffect } from 'react';
import { Slide, Stack, Typography } from '@mui/material';
import { Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import PhoneInput from 'react-phone-input-2';

import { DefaultSnackbar } from 'components';
import { Dispatch, RootState } from 'app/store';
import { sendAuthSMS } from 'providers/auth/firebase/phone-verification';
import { ThreeDots } from 'components/css-loaders/three-dots';

import 'react-phone-input-2/lib/style.css';

export const PhoneNumber = () => {
    const [_, setOpen] = useState(false);
    const dispatch = useDispatch<Dispatch>();
    const { phoneNumber, country, apiFetchState, disableNext } = useSelector((state: RootState) => state.onboarding);

    const handleSendVerificationCode = () => {
        dispatch.onboarding.setApiFetchState({
            ...apiFetchState,
            loading: true
        });
        sendAuthSMS(phoneNumber)
            .then(({ verificationId }) => {
                dispatch.onboarding.setVerificationId(verificationId);
                dispatch.onboarding.setActiveStep('verification');
                dispatch.onboarding.setApiFetchState({
                    ...apiFetchState,
                    result: 'success',
                    loading: false,
                    message: `We have successfully sent your verification code`
                });
                dispatch.onboarding.setDisableNext(false);
            })
            .catch(() => {
                dispatch.onboarding.setApiFetchState({
                    ...apiFetchState,
                    result: 'error',
                    loading: false,
                    message: 'There was an error sending verification code. Try again'
                });
            });
    };

    const { loading, result, message } = apiFetchState;

    const handleCloseSnackBar = () => {
        setOpen(false);
        dispatch.onboarding.setApiFetchState({});
    };

    useEffect(() => {
        dispatch.onboarding.setDisableNext(true);
    }, [dispatch]);

    return (
        <>
            <DefaultSnackbar open={result === 'error'} handleClose={handleCloseSnackBar} severity={'error'} title={'Error'} info={message ?? ''} />
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
                    {loading ? (
                        <ThreeDots variantColor={'base'} />
                    ) : (
                        <Button
                            onClick={handleSendVerificationCode}
                            variant={'contained'}
                            id={'recaptcha'}
                            color={'primary'}
                            style={{ marginTop: 20 }}
                            disabled={phoneNumber.length < 3}
                        >
                            Send verification code
                        </Button>
                    )}
                </Stack>
            </Slide>
        </>
    );
};
