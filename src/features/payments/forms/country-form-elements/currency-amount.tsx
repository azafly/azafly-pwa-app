import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';

import { Country, useCountryList } from '../../hooks';
import { CountryList } from '../country-list';
import { CountrySelectToggle } from '../country-select-toggle';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: 350,
            display: 'flex',
            height: '5rem',
            alignItems: 'center',
            padding: '15px 20px',
            justifyContent: 'space-between',
            borderRadius: 8,
            backgroundColor: theme.palette.background.paper,
            boxShadow: '0 0 7px 0 #bac4cf',
            position: 'relative',
            [theme.breakpoints.only('xs')]: {
                width: 320
            }
        },
        input: {
            webkitAppearance: 'none',
            border: 'none',
            height: '100%',
            borderBottom: 'none',
            color: theme.colors.textPrimary,
            fontWeight: 750,
            fontSize: '1.5rem',
            '& .MuiInput-underline::before': {
                borderBottom: 'none'
            }
        },
        listbox: {
            width: 500
        },
        automCompleteRoot: {
            width: 500
        }
    })
);

interface CurrencyAmountProps {
    country: Country;
    handleCountryChange: any;
}

export function CurrencyAmount({ country, handleCountryChange }: CurrencyAmountProps) {
    const classes = useStyles();
    const [amount, setAmount] = React.useState(0);
    const [showCountryList, setShowCountryList] = React.useState(false);
    const { popularTargetCountries } = useCountryList() || {};

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(parseInt(event.target.value));
    };

    const handleShow = (e: any) => {
        e.preventDefault();
        setShowCountryList(!showCountryList);
    };

    return (
        <div className={classes.root} onClick={handleShow}>
            <TextField
                id='outlined-adornment-amount'
                value={amount}
                type='number'
                defaultValue={100}
                className={classes.input}
                onChange={handleChange}
                InputProps={{
                    className: classes.input
                }}
            />
            <CountrySelectToggle selectedCountry={country} />
            {showCountryList && !!popularTargetCountries && (
                <CountryList show={showCountryList && !!popularTargetCountries} countryList={popularTargetCountries} />
            )}
        </div>
    );
}
