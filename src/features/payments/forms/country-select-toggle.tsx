import { Box } from '@material-ui/core';

import { Country } from './country-form-elements/use-country-list';




interface ICountrySelectToggle {
    selectedCountry: Country
    handleShowToggle: (e: any) => void

}

export const CountrySelectToggle = ({ selectedCountry, handleShowToggle }: ICountrySelectToggle) => {
    return (
        <Box
            onClick={handleShowToggle}
            sx={{
                display: 'flex'
            }}>
            <span> {selectedCountry.emoji}</span>
            <span> {selectedCountry.currency}</span>
            <span> {'>'}</span>
        </Box>
    )
}
