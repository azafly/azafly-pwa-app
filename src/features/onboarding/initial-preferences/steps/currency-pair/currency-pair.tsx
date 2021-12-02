import { RootState, Dispatch } from 'app/store';
import { Button, Stack } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';

import { CountrySelect } from '../../country-select';
import MultiSelectCheckBox from '../../multi-select-dropdown';

export const CurrencyPair = () => {
    const {
        userGeolocation,
        countryList: { NIGERIA, popularTargetCountries, popularSourceCountries, formattedCountries }
    } = useSelector((state: RootState) => state.onboarding);
    const dispatch = useDispatch<Dispatch>();

    const countryOfResidence = formattedCountries.filter(({ code }) => code === userGeolocation.country_code);

    return (
        <Stack>
            <CountrySelect handleCountryChange={dispatch.onboarding.setCountry} defaultOption={countryOfResidence[0]} />
            <MultiSelectCheckBox options={[NIGERIA, ...popularSourceCountries, ...popularTargetCountries]} handleChange={() => console.log('data')} />
            <Button onClick={() => dispatch.onboarding.setActiveStep('kyc')} variant={'contained'} color={'primary'} style={{ marginTop: 20 }}>
                Continue
            </Button>
        </Stack>
    );
};
