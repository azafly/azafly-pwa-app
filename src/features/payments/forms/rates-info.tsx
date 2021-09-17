
import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Grid, MenuItem, TextField } from '@material-ui/core';



import { CountrySelect } from './country-form-elements/source-country-select';
import { CurrencyAmount } from './country-form-elements/currency-amount';

import { Country, useCountryList } from './country-form-elements/use-country-list';






const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            marginTop: 50,
            '& .MuiTextField-root': {
            },
        },
    }),
);

export function RatesInfo() {
    const classes = useStyles();
    const { NIGERIA } = useCountryList()
    const [country, setCountry] = React.useState<Country>(NIGERIA);


    const handleCountryChange = (_: any, value: Country) => {
        setCountry(value);
    };

    return (
        <form className={classes.root} noValidate autoComplete="off">
            <div>
                <Grid container >
                    <Grid xs={12} md={6}>
                        <CountrySelect handleCountryChange={handleCountryChange} />
                    </Grid>
                    <Grid xs={12} md={6}>
                        < CurrencyAmount country={country} />
                    </Grid>
                </Grid>
            </div>
        </form>
    );
}
