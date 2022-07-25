import { useState, useEffect } from 'react';
import { Slide, Stack, Typography } from '@mui/material';
import { Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import PhoneInput from 'react-phone-input-2';

import { DefaultSnackbar } from 'components';
import { Dispatch, RootState } from 'app/store';
import { sendAuthSMS } from 'providers/auth/firebase/phone-verification';
import { ThreeDots } from 'components/css-loaders/three-dots';
import { useCheckPhoneExistsLazyQuery } from 'api/generated/graphql';

import 'react-phone-input-2/lib/style.css';

export const PhoneNumber = () => {
    const [_, setOpen] = useState(false);
    const dispatch = useDispatch<Dispatch>();
    const { phoneNumber, apiFetchState } = useSelector((state: RootState) => state.onboarding);

    const [handleCheckPhoneNumber, { data, error }] = useCheckPhoneExistsLazyQuery({
        variables: {
            phone: phoneNumber
        }
    });

    const checkIfPhoneNumberExists = () => {
        handleCheckPhoneNumber();
    };

    // todo : check if phone exits if not local or staging
    const handleSendVerificationCode = () => {
        checkIfPhoneNumberExists();
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
                    message: `We have sent you a verification code`
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
            })
            .finally(() => {
                dispatch.onboarding.setDisableNext(true);
                dispatch.onboarding.setApiFetchState({});
            });
    };

    const { loading = false, result, message } = apiFetchState;

    const handleCloseSnackBar = () => {
        setOpen(false);
        dispatch.onboarding.setApiFetchState({});
    };

    useEffect(() => {
        dispatch.onboarding.setDisableNext(true);
    }, [dispatch]);
    debugger;
    return (
        <>
            <DefaultSnackbar open={result === 'error'} handleClose={handleCloseSnackBar} severity={'error'} title={'Error'} info={message ?? ''} />
            <Slide direction='left' in={true} mountOnEnter unmountOnExit appear timeout={800}>
                <Stack sx={{ width: '100%' }}>
                    <Typography variant={'h6'} align={'center'} style={{ fontWeight: 700, fontFamily: 'Nunito', color: '#0d324d', marginBottom: 10 }}>
                        {' '}
                        {`Let's verify your phone number. `}
                    </Typography>
                    <Typography
                        align={'center'}
                        paragraph
                        style={{ fontWeight: 400, fontFamily: 'Nunito', color: '#0d324d', marginBottom: 20, fontSize: '0.85rem' }}
                    >
                        We get to know you and helps us keep your account secure.
                    </Typography>
                    <PhoneInput
                        inputProps={{
                            name: 'phone',
                            required: true,
                            autoFocus: true
                        }}
                        country={'de'}
                        value={phoneNumber}
                        onChange={phone => dispatch.onboarding.setPhoneNumber(phone)}
                        regions={['america', 'europe', 'oceania', 'africa']}
                    />
                    {apiFetchState.loading ? (
                        <ThreeDots variantColor={'base'} loadingText={'sending code'} textPosition={'end'} />
                    ) : (
                        <Button
                            onClick={handleSendVerificationCode}
                            variant={'contained'}
                            id={'recaptcha'}
                            color={'primary'}
                            style={{ marginTop: 20 }}
                            disabled={phoneNumber.length < 7}
                        >
                            Send verification code
                        </Button>
                    )}
                </Stack>
            </Slide>
        </>
    );
};
