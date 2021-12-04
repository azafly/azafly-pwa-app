import { Slide, Stack } from '@mui/material';
import { Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import { Dispatch } from 'app/store';
import MultiSelectCheckBox from '../../multi-select-dropdown';

export const CurrencyPair = () => {
    const dispatch = useDispatch<Dispatch>();

    return (
        <>
            Your preferred currencies. We will create wallets for you in these currencies to get you started quickly
            <Slide direction='up' in={true} mountOnEnter unmountOnExit appear timeout={800}>
                <Stack sx={{ width: '100%' }}>
                    <MultiSelectCheckBox handleChange={(e, currencies) => dispatch.onboarding.setCurrencies(currencies)} />
                    <Button
                        onClick={() => dispatch.onboarding.setActiveStep('kyc')}
                        variant={'contained'}
                        color={'primary'}
                        style={{ marginTop: 20 }}
                    >
                        Continue
                    </Button>
                </Stack>
            </Slide>
        </>
    );
};
