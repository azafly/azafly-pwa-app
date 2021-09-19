
import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { FormControl, Grid, InputLabel, OutlinedInput, InputAdornment } from '@material-ui/core';



import { Country, useCountryList } from './country-form-elements/use-country-list';


import { PAYER_INFO } from './form-fields';




const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            marginTop: 50,
            '& .MuiTextField-root': {
            },
        },
        formControl: {
            marginBottom: 20,
            maxWidth: 450,
            margin: 'auto'
        },
        formField: {

        }
    }),
);

export function PayerInfo() {
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
                    {PAYER_INFO.map(({ label }) => {
                        return <Grid xs={12} md={6} spacing={3} className={classes.formControl}>
                            <FormControl fullWidth variant="outlined" className={classes.formField}>
                                <InputLabel htmlFor="outlined-adornment-amount">{label}</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-amount"
                                    value={1000}
                                    type='number'
                                    onChange={() => { }}
                                    startAdornment={<InputAdornment position="start">{'$'}</InputAdornment>}
                                    labelWidth={60}
                                />
                            </FormControl>
                        </Grid>

                    })}
                </Grid>
            </div>
        </form>
    );
}
