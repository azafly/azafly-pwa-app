import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';


import { Country } from './use-country-list';
import { CountryList } from '../country-list';
import { CountrySelectToggle } from '../country-select-toggle'

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
            boxShadow: '0 0 7px 0 #bac4cf',
            position: 'relative',
            [theme.breakpoints.only('xs')]: {
                width: 270
            }
        },
        underline: {
            '&::before': {
                borderBottom: 'none'
            }
        },
        input: {
            webkitAppearance: 'none',
            border: 'none',
            height: '100%',
        },
        listbox: {
            width: 500,
        },
        automCompleteRoot: {
            width: 500,
        },
    }),
);

interface CurrencyAmountProps {
    country: Country
    handleCountryChange: any
}

export function CurrencyAmount({ country, handleCountryChange }: CurrencyAmountProps) {
    const classes = useStyles();
    const [amount, setAmount] = React.useState(0);
    const [showCountryList, setShowCountryList] = React.useState(false)

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(parseInt(event.target.value));
    };



    const handleShow = (e: any) => {
        e.preventDefault()
        setShowCountryList(!showCountryList)
    }

    return (

        <div className={classes.root}>
            <TextField
                id="outlined-adornment-amount"
                value={amount}
                type='text'
                onChange={handleChange}
            />
            <CountrySelectToggle handleShowToggle={handleChange} selectedCountry={country} />
            {showCountryList && <CountryList countries={[country]} />}
        </div>
    );
}
