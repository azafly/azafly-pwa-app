import { Slide, Stack, Typography } from '@mui/material';
import { Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import { Dispatch } from 'app/store';
import MultiSelectCheckBox from '../../multi-select-dropdown';

export const CurrencyPair = () => {
    const dispatch = useDispatch<Dispatch>();

    return (
        <Slide direction='up' in={true} mountOnEnter unmountOnExit appear timeout={800}>
            <Stack sx={{ width: '100%' }}>
                <Typography variant={'h6'} sx={{ fontWeight: 700, fontFamily: 'Nunito', color: '#0d324d' }} gutterBottom align={'center'}>
                    {' '}
                    Select currencies you usually need to transact in.
                </Typography>
                <Typography paragraph sx={{ fontWeight: 400, fontFamily: 'Nunito' }} gutterBottom align={'center'}>
                    We will create accounts for you in these currencies to get you started
                </Typography>
                <MultiSelectCheckBox handleChange={(e, currencies) => dispatch.onboarding.setCurrencies(currencies)} />
                <Button onClick={() => dispatch.onboarding.setActiveStep('kyc')} variant={'contained'} color={'primary'} style={{ marginTop: 20 }}>
                    Continue
                </Button>
            </Stack>
        </Slide>
    );
};