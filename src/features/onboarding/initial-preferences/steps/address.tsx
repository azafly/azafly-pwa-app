import { Button } from '@material-ui/core';
import { GoogleAddressAutoComplete } from 'components';
import { Slide, Stack, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';

import { Dispatch } from 'app/store';

export const Address = () => {
    const dispatch = useDispatch<Dispatch>();

    return (
        <Slide direction='up' in={true} mountOnEnter unmountOnExit appear timeout={800}>
            <Stack sx={{ width: '100%' }}>
                <Typography
                    variant={'h6'}
                    style={{ fontWeight: 700, fontFamily: 'Nunito', color: '#0d324d', marginBottom: 30 }}
                    align={'center'}
                    gutterBottom
                >
                    Your primary residence address
                </Typography>
                <GoogleAddressAutoComplete reduxSetAddressValue={value => dispatch.onboarding.setAddress(value)} />
                <Button onClick={() => dispatch.onboarding.setActiveStep('kyc')} variant={'contained'} color={'primary'} style={{ marginTop: 20 }}>
                    Continue
                </Button>
            </Stack>
        </Slide>
    );
};
