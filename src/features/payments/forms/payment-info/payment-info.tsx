import { Button, Grid } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useFormik } from 'formik';

import { PAYMENT_INFO, validationSchema, initialValues, generateInputType } from './form-fields';
import { LOCAL_STORAGE_KEY } from '../../context/constants';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            boxShadow: '0 2px 20px 0 rgba(0,0,0,.05) !important',
            padding: '80px 50px',
            borderRadius: 4,
            backgroundColor: '#fff',
            margin: 50,
            [theme.breakpoints.down('sm')]: {
                margin: '50px 5px'
            }
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

interface PaymentInfoProps {
    gotToNextStep: () => void;
}
export function PaymentInfo({ gotToNextStep }: PaymentInfoProps) {
    const classes = useStyles();

    // TODO - prefill form

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema,
        onSubmit: values => {
            localStorage.setItem(LOCAL_STORAGE_KEY.PAYMENT_INFO, JSON.stringify(values));
            gotToNextStep();
        }
    });

    return (
        <form className={classes.root} noValidate autoComplete='off' onSubmit={formik.handleSubmit}>
            <div>
                <Grid container spacing={3}>
                    {PAYMENT_INFO.map(option => {
                        const { label, name } = option;
                        return (
                            <Grid item xs={12} md={6} lg={4} className={classes.formControl} key={label}>
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
                    <Button color='primary' variant='contained' fullWidth type='submit' style={{ marginTop: 10 }}>
                        Submit
                    </Button>
                </Grid>
            </div>
        </form>
    );
}
