import { Slide, Stack } from '@mui/material';
import { Button } from '@material-ui/core';
import { GoogleAddressAutoComplete } from 'components';
import { useDispatch } from 'react-redux';

import { Dispatch } from 'app/store';

export const Address = () => {
    const dispatch = useDispatch<Dispatch>();

    return (
        <Slide direction='up' in={true} mountOnEnter unmountOnExit appear timeout={800}>
            <Stack sx={{ width: '100%' }}>
                <GoogleAddressAutoComplete reduxSetAddressValue={value => dispatch.onboarding.setAddress(value)} />
                <Button onClick={() => dispatch.onboarding.setActiveStep('kyc')} variant={'contained'} color={'primary'} style={{ marginTop: 20 }}>
                    Continue
                </Button>
            </Stack>
        </Slide>
    );
};
