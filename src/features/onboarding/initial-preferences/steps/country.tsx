import { Stack, Slide, Typography } from '@mui/material';
import { Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import { CountrySelect } from '../country-select';
import { Dispatch } from 'app/store';

export const CountryOfResidence = () => {
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
                    Your country of primary residence
                </Typography>
                <CountrySelect handleCountryChange={dispatch.onboarding.setCountry} />
                <Button onClick={() => dispatch.onboarding.setActiveStep('currencies')} variant={'contained'} color={'primary'}>
                    {' '}
                    Continue
                </Button>
            </Stack>
        </Slide>
    );
};
