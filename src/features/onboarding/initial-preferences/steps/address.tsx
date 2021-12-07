import { useEffect, useMemo } from 'react';
import { Button } from '@material-ui/core';
import { GoogleAddressAutoComplete } from 'components';
import { Slide, Stack, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { Dispatch, RootState } from 'app/store';

export const Address = () => {
    const dispatch = useDispatch<Dispatch>();
    const { address } = useSelector((state: RootState) => state.onboarding);
    const disableNext = useMemo(() => !Boolean(address.length > 5), [address]);

    useEffect(() => {
        dispatch.onboarding.setDisableNext(disableNext);
    }, [dispatch, disableNext]);

    return (
        <Slide
            direction='up'
            in
            mountOnEnter
            unmountOnExit
            appear
            timeout={800}
            easing={{ enter: 'cubic-bezier(0.0, 0, 0.2, 1)', exit: 'cubic-bezier(0.4, 0, 1, 1)' }}
        >
            <Stack sx={{ width: '100%' }}>
                <Typography
                    variant={'h6'}
                    style={{ fontWeight: 700, fontFamily: 'Nunito', color: '#0d324d', marginBottom: 20 }}
                    align={'center'}
                    gutterBottom
                >
                    Your primary residence address
                </Typography>
                <Typography
                    align={'center'}
                    paragraph
                    style={{ fontWeight: 400, fontFamily: 'Nunito', color: '#0d324d', marginBottom: '30px', fontSize: '0.85rem' }}
                >
                    This is for compliance reasons. Your information is private and secure.
                </Typography>
                <GoogleAddressAutoComplete reduxSetAddressValue={value => dispatch.onboarding.setAddress(value)} />
                <Button
                    onClick={() => dispatch.onboarding.setActiveStep('kyc')}
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
