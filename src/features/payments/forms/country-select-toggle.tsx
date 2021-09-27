import { Box } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import { Country } from './country-form-elements/use-country-list';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            justifyContent: 'space-between',
            alignContent: 'center',
            '& .emoji': {
                fontSize: 24,
            },
            '& .currency': {
                margin: "0px 5px",
                color: theme.colors.textPrimary,
                fontWeight: 650,
                fontSize: '1rem',

            },
            "& .toggle": {
                marginLeft: 20,
                color: theme.colors.base,
                fontWeight: 700
            },
        },

    }),
);



interface ICountrySelectToggle {
    selectedCountry: Country
    handleShowToggle: (e: any) => void

}

export const CountrySelectToggle = ({ selectedCountry, handleShowToggle }: ICountrySelectToggle) => {

    const classes = useStyles();
    return (
        <div
            className={classes.root}
            onClick={handleShowToggle}>
            <span className={'emoji'}> {selectedCountry.emoji}</span>
            <span className={'currency'}> {selectedCountry.currency}</span>
            <span className={'toggle'}> {'v'}</span>
        </div>
    )
}
