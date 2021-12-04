import { Box, Slide, TextField } from '@mui/material';
import { Button } from '@material-ui/core';
import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { makeStyles, Theme } from '@material-ui/core/styles';

import { RootState } from 'app/store';
import { sendAuthSMS } from 'providers/auth/firebase/phone-verification';

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
    const { phoneNumber, country } = useSelector((state: RootState) => state.onboarding);
    const handleDispatchPhoneNumberUpdated = () => {
        // sendAuthSMS(user, phoneNumber)
        //     .then(data => {
        //         console.log(data);
        //     })
        //     .catch(error => console.log(error));
    };
    const classes = useStyles();
    return (
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
                    id={'Phone number'}
                    classes={{ root: classes.root }}
                    sx={{ width: '100%', marginBottom: '30px' }}
                    fullWidth
                />
                <Button variant={'contained'} color={'primary'} fullWidth>
                    Verify
                </Button>
            </Box>
        </Slide>
    );
};
