import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import { Country, useCountryList } from './use-country-list';
import { Input } from '@material-ui/core'


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: 350,
            marginRight: 20,
            marginBottom: 30,
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
            borderRadius: 4,
            WebkitAppearance: 'none',
            boxShadow: '0 2px 16px 0 rgba(0,0,0,0.08)',
            background: '#fff !important',
            border: 'none',
            padding: 20,
            margin: '10px 0px',
            height: 40,
        },
    }),
);

interface CurrencyAmountProps {
    country: Country
}

export function CurrencyAmount({ country }: CurrencyAmountProps) {
    const classes = useStyles();
    const [amount, setAmount] = React.useState(0);

    const { currency } = useCountryList()

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(event.target.valueAsNumber);
    };

    return (
        <div className={classes.root}>
            <div>
                <FormControl fullWidth variant="outlined">
                    {/* <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-amount"
                        value={amount}
                        type='number'
                        onChange={handleChange}
                        startAdornment={<InputAdornment position="start">{currency}</InputAdornment>}
                        labelWidth={60}
                    /> */}
                    <Input classes={{ underline: classes.underline }} type='password' id='reset-email' placeholder='New Password' name={'password'} className={classes.input} />
                </FormControl>
            </div>
        </div>
    );
}
