import { RootState, Dispatch } from 'app/store';
import { useSelector, useDispatch } from 'react-redux';
import { AfricaCountriesSelect } from './country-select';

export const CurrencyPair = () => {
    const {
        userGeolocation,
        countryList: { formattedCountries }
    } = useSelector((state: RootState) => state.onboarding);
    const dispatch = useDispatch<Dispatch>();

    const countryOfResidence = formattedCountries.filter(({ code }) => code === userGeolocation.country_code);

    return (
        <div>
            <AfricaCountriesSelect handleCountryChange={dispatch.onboarding.setCountry} defaultOption={countryOfResidence[0]} />
        </div>
    );
};
