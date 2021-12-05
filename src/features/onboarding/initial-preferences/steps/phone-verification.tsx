import { useState } from 'react';
import { Box, Slide, TextField } from '@mui/material';
import { Button } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { DefaultSnackbar } from 'components';
import { Dispatch, RootState } from 'app/store';
import { ThreeDots } from 'components/css-loaders/three-dots';
import { verifyPhoneNumber } from 'providers/auth/firebase/phone-verification';

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
        }
    }
}));

export const PhoneVerification = () => {
    const [verificationCode, setVerificationCode] = useState('');
    const [_, setOpen] = useState(false);

    const { apiFetchState, verificationId } = useSelector((state: RootState) => state.onboarding);
    const { loading, result, message } = apiFetchState;
    const dispatch = useDispatch<Dispatch>();

    const handleVerifyPhoneNumber = () => {
        dispatch.onboarding.setApiFetchState({
            ...apiFetchState,
            loading: true
        });
        verifyPhoneNumber(verificationCode, verificationId)
            .then(() => {
                dispatch.onboarding.setApiFetchState({
                    ...apiFetchState,
                    result: 'success',
                    loading: false,
                    message: `Success`
                });
                dispatch.onboarding.setActiveStep('country');
            })
            .catch(() => {
                dispatch.onboarding.setDisableNext(true);
                dispatch.onboarding.setApiFetchState({
                    ...apiFetchState,
                    result: 'error',
                    loading: false,
                    message: `Wrong verification code. Try again`
                });
            });
    };
    const classes = useStyles();

    const handleCloseSnackBar = () => {
        setOpen(false);
        dispatch.onboarding.setApiFetchState({});
    };

    return (
        <>
            <DefaultSnackbar open={result === 'error'} handleClose={handleCloseSnackBar} severity={'error'} title={'Error'} info={message ?? ''} />
            <Slide direction='up' in={true} mountOnEnter unmountOnExit appear timeout={800}>
                <Box sx={{ width: '100%' }}>
                    <Typography variant={'h6'} gutterBottom align={'center'} sx={{ fontWeight: 700, fontFamily: 'Nunito', marginBottom: 2 }}>
                        {'Enter the 6-digit code you receive on your phone'}
                    </Typography>
                    <TextField
                        label={'Verification Code'}
                        placeholder={'123456'}
                        inputProps={{
                            className: classes.root
                        }}
                        onChange={e => setVerificationCode(e.target.value)}
                        id={'Phone number'}
                        classes={{ root: classes.root }}
                        sx={{ width: '100%', marginBottom: '30px' }}
                        fullWidth
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
