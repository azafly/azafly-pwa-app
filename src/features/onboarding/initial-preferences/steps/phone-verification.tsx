import axios from 'axios';
import { useState } from 'react';
import { Box, Slide, TextField } from '@mui/material';
import { Button } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { signInAnonymously } from 'firebase/auth';

import { DefaultSnackbar } from 'components';
import { Dispatch, RootState } from 'app/store';
import { ThreeDots } from 'components/css-loaders/three-dots';
import { verifyPhoneNumber } from 'providers/auth/firebase/phone-verification';
import { ENV, getEnv } from 'format-env';
import { firebaseAuth } from 'providers/auth/firebase';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        marginBottom: 30,
        padding: '10px 20px',
        borderRadius: 8,
        backgroundColor: theme.palette.background.paper,
        boxShadow: '0 0 7px 0 #bac4cf',
        [theme.breakpoints.only('xs')]: {
            width: '100%'
        },
        '& .MuiInput-underline::before': {
            borderBottom: 'none'
        },
        '& .MuiInput-underline::after': {
            borderBottom: 'none'
        },
        '& label': {
            paddingLeft: 10
        }
    }
}));

const registerUserInDB = (user: any, token: string) => {
    const FUNCTIONS_BASE_URL = getEnv(ENV.REACT_APP_FUNCTIONS_BASE_URL);
    axios
        .post(
            `${FUNCTIONS_BASE_URL}/newUser/register`,
            { user },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        .then(result => console.log(result))
        .catch(error => console.log(error));
};

export const PhoneVerification = () => {
    const [verificationCode, setVerificationCode] = useState('');
    const [_, setOpen] = useState(false);

    const {
        onboarding: { apiFetchState, verificationId, phoneNumber, displayName },
        auth: { user, token }
    } = useSelector(({ onboarding, auth }: RootState) => ({ onboarding, auth }));
    const { loading, result, message } = apiFetchState;
    const dispatch = useDispatch<Dispatch>();

    const handleVerifyPhoneNumber = async () => {
        dispatch.onboarding.setApiFetchState({
            ...apiFetchState,
            loading: true
        });
        dispatch.onboarding.setDisableNext(true);
        try {
            await verifyPhoneNumber(verificationCode, verificationId);
            dispatch.onboarding.setApiFetchState({
                ...apiFetchState,
                result: 'success',
                loading: false,
                message: `Success`
            });
            dispatch.onboarding.setActiveStep('address');
            dispatch.onboarding.setPhoneVerified(true);
            if (user && token) {
                const result = await signInAnonymously(firebaseAuth);
                console.log(result);
                debugger;
                const { email, emailVerified, photoURL } = user;
                registerUserInDB(
                    {
                        email,
                        emailVerified,
                        displayName,
                        photoURL,
                        phoneNumber,
                        isNewUser: false
                    },
                    token
                );
            }
        } catch (error) {
            dispatch.onboarding.setDisableNext(true);
            dispatch.onboarding.setApiFetchState({
                ...apiFetchState,
                result: 'error',
                loading: false,
                message: `Wrong verification code. Try again`
            });
        }
    };
    const classes = useStyles();

    const handleCloseSnackBar = () => {
        setOpen(false);
        dispatch.onboarding.setApiFetchState({});
    };

    return (
        <>
            <DefaultSnackbar open={result === 'error'} handleClose={handleCloseSnackBar} severity={'error'} title={'Error'} info={message ?? ''} />
            <Slide direction='left' in={true} mountOnEnter unmountOnExit appear timeout={800}>
                <Box sx={{ width: '100%' }}>
                    <Typography
                        variant={'h6'}
                        style={{ fontWeight: 700, fontFamily: 'Nunito', color: '#0d324d', marginBottom: 20 }}
                        align={'center'}
                        gutterBottom
                    >
                        {'Enter the 6-digit code you receive on your phone'}
                    </Typography>
                    <TextField
                        label={'Verification Code'}
                        onChange={e => setVerificationCode(e.target.value)}
                        id={'Phone number'}
                        classes={{ root: classes.root }}
                        sx={{ width: '100%', marginBottom: '30px' }}
                        fullWidth
                        type={'number'}
                        variant={'standard'}
                    />
                    {loading ? (
                        <ThreeDots variantColor={'base'} />
                    ) : (
                        <Button
                            variant={'contained'}
                            color={'primary'}
                            fullWidth
                            onClick={handleVerifyPhoneNumber}
                            disabled={verificationCode.length < 6}
                        >
                            Verify
                        </Button>
                    )}
                </Box>
            </Slide>
        </>
    );
};
