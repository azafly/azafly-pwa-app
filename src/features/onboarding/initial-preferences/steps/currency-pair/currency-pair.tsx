import { useEffect, useMemo } from 'react';
import { Slide, Stack, Typography } from '@mui/material';
import { Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import { Dispatch, RootState } from 'app/store';
import MultiSelectCheckBox from '../../multi-select-dropdown';

export const CurrencyPair = () => {
    const dispatch = useDispatch<Dispatch>();
    const { currencies, country } = useSelector((state: RootState) => state.onboarding);
    const disableNext = useMemo(() => !Boolean(currencies.length), [currencies]);

    useEffect(() => {
        dispatch.onboarding.setDisableNext(disableNext);
    }, [dispatch, disableNext]);

    return (
        <Slide direction='down' in={true} mountOnEnter unmountOnExit appear timeout={800}>
            <Stack sx={{ width: '100%' }}>
                <Typography variant={'h6'} sx={{ fontWeight: 700, fontFamily: 'Nunito', color: '#0d324d', marginBottom: '10px' }} align={'center'}>
                    {' '}
                    {country?.region === 'AF' ? 'Select currencies you usually need to transact in.' : 'Select the country you mostly send money to.'}
                </Typography>
                <Typography
                    align={'center'}
                    paragraph
                    style={{ fontWeight: 400, fontFamily: 'Nunito', color: '#0d324d', marginBottom: '30px', fontSize: '0.85rem' }}
                >
                    We will create accounts for you in these currencies to get you started quickly.
                </Typography>
                <MultiSelectCheckBox handleChange={(_, currencies) => dispatch.onboarding.setCurrencies(currencies)} />
                <Button
                    onClick={() => dispatch.onboarding.setActiveStep('address')}
                    variant={'contained'}
                    color={'primary'}
                    style={{ marginTop: 20 }}
                    disabled={disableNext}
                >
                    Continue
                </Button>
            </Stack>
        </Slide>
    );
};
