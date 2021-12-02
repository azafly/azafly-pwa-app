import { Button, Stack } from '@mui/material';
import { GoogleAddressAutoComplete } from 'components';
import { useDispatch } from 'react-redux';

import { Dispatch } from 'app/store';

export const Address = () => {
    const dispatch = useDispatch<Dispatch>();
    const handleDispatchAddressUpdated = () => {
        dispatch.onboarding.setAddress;
    };

    return (
        <Stack sx={{ width: '90vw', maxWidth: 1000 }}>
            <GoogleAddressAutoComplete reduxSetAddressValue={handleDispatchAddressUpdated} />
            <Button onClick={() => dispatch.onboarding.setActiveStep('kyc')} variant={'contained'} color={'primary'} style={{ marginTop: 20 }}>
                Continue
            </Button>
        </Stack>
    );
};
