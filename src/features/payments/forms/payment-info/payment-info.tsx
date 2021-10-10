import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Button, Grid, TextField } from '@material-ui/core';
import { useFormik } from 'formik';

import { Country, useCountryList } from '../../hooks';
import { PAYMENT_INFO, validationSchema, initialValues, generateInputType } from './form-fields';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            marginTop: 50
        },
        formControl: {
            marginBottom: 20
        },
        formField: {},
        '& .input_root': {
            color: 'green'
        },
        input: {
            borderRadius: 4,
            WebkitAppearance: 'none',
            boxShadow: '0 2px 16px 0 rgba(0,0,0,0.08)',
            background: '#fff !important',
            border: 'none',
            padding: 20,
            margin: '10px 0px',
            height: 40
        }
    })
);

export function PayerInfo() {
    const classes = useStyles();
    const { NIGERIA } = useCountryList() || {};
    const [country, setCountry] = React.useState<Country>(NIGERIA!);

    const handleCountryChange = (_: any, value: Country) => {
        setCountry(value);
    };

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema,
        onSubmit: values => {
            console.log(values);
        }
    });

    return (
        <form className={classes.root} noValidate autoComplete='off' onSubmit={formik.handleSubmit}>
            <div>
                <Grid container spacing={3}>
                    {PAYMENT_INFO.map(option => {
                        const { label, name, type, items } = option;
                        return (
                            <Grid item xs={6} md={4} className={classes.formControl} key={label}>
                                {generateInputType(
                                    {
                                        onChange: formik.handleChange,
                                        error: formik.touched[name] && Boolean(formik.errors[name]),
                                        helperText: formik.touched[name] && formik.errors[name]
                                    },
                                    option
                                )}
                            </Grid>
                        );
                    })}
                    {/* {generateInputType(
                            onChange: formik.handleChange,
                            error: formik.touched[name] && Boolean(formik.errors[name]),
                            helperText: formik.touched[name] && formik.errors[name]
                    }
                    })} */}
                    <Button color='primary' variant='contained' fullWidth type='submit'>
                        Submit
                    </Button>
                </Grid>
            </div>
        </form>
    );
}
