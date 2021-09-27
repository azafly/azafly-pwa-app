
import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Grid, MenuItem, TextField } from '@material-ui/core';



import { CountrySelect } from './country-form-elements/country-select';
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
        option: {
            fontSize: '1rem',
            fontWeight: 650,
            '& > span': {
                marginRight: 10,

            },
            '& .emoji': {
                fontSize: 24,
            },
            '& .name': {
                marginRight: 5,
                color: theme.colors.textPrimary,
                fontWeight: 650,
                fontSize: '1rem',

            },
            '& .coming-soon': {
                background: 'grey',
                border: '1px solid inherit',
                padding: 5,
                borderRadius: 6,
                marginLeft: 10
            },
        }
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
                    <Grid xs={12}>
                        <CountrySelect handleCountryChange={handleCountryChange} classKeys={{ option: classes.option }} />
                    </Grid>
                    <Grid xs={12}>
                        <CurrencyAmount country={country} handleCountryChange={handleCountryChange} />
                    </Grid>
                </Grid>
            </div>
        </form>
    );
}
