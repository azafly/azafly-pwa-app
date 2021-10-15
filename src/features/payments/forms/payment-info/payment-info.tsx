import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Button, Grid } from '@material-ui/core';
import { useFormik } from 'formik';

import { PAYMENT_INFO, validationSchema, initialValues, generateInputType } from './form-fields';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            marginTop: 50
        },
        formControl: {
            marginBottom: 20,
            borderRadius: 4,
            WebkitAppearance: 'none',
            '& .MuiInput-formControl::before': {
                opacity: 0.8
            },
            '& .MuiFormLabel-root': {
                opacity: 0.8,
                marginLeft: 15,
                fontSize: '0.85rem',
                [theme.breakpoints.down('md')]: {
                    marginLeft: 5,
                    fontSize: '0.85rem'
                }
            }
        }
    })
);

export function PayerInfo() {
    const classes = useStyles();

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
                        const { label, name } = option;
                        return (
                            <Grid item xs={12} sm={6} md={4} className={classes.formControl} key={label}>
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
                    <Button color='primary' variant='contained' fullWidth type='submit'>
                        Submit
                    </Button>
                </Grid>
            </div>
        </form>
    );
}
