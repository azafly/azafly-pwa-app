import { Button, Stack } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';

import { RootState, Dispatch } from 'app/store';

import { CountrySelect } from '../country-select';

export const CountryOfResidence = () => {
    const {
        userGeolocation,
        countryList: { formattedCountries }
    } = useSelector((state: RootState) => state.onboarding);
    const dispatch = useDispatch<Dispatch>();

    const countryOfResidence = formattedCountries.filter(({ code }) => code === userGeolocation.country_code);

    return (
        <Stack sx={{}}>
            <CountrySelect handleCountryChange={dispatch.onboarding.setCountry} defaultOption={countryOfResidence[0]} optionVariant={'foreign'} />
            <Button onClick={() => dispatch.onboarding.setActiveStep('currencyPair')} variant={'contained'} color={'primary'}>
                {' '}
                Continue
            </Button>
        </Stack>
    );
};
