import { Button, Grid } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useFormik } from 'formik';

import { PAYMENT_INFO, validationSchema, initialValues, generateInputType } from './form-fields';
import { LOCAL_STORAGE_KEY } from 'libs/local-storage-keys';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            padding: '80px 50px',
            borderRadius: 4,
            backgroundColor: 'rgb(254,254,250)',
            margin: 50,
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                boxShadow: '0 2px 20px 0 rgba(0,0,0,.05) !important'
            },
            [theme.breakpoints.only('sm')]: {
                margin: '50px 5px'
            },
            [theme.breakpoints.only('xs')]: {
                margin: '50px 0px',
                width: '100%',
                padding: 15,
                backgroundColor: '#f7f7f7'
            },
            '& .option-label': {
                fontSize: '1.1rem',
                fontFamily: 'inherit',
                fontWeight: 400
            }
        },
        formControl: {
            marginBottom: 20,
            borderRadius: 4,
            WebkitAppearance: 'none',
            '& .MuiInput-formControl::before': {
                opacity: 0.8,
                margin: 'auto'
            },
            '& .MuiFormLabel-root': {
                opacity: 0.8,
                marginLeft: 15,
                fontSize: '0.85rem',
                [theme.breakpoints.down('md')]: {
                    marginLeft: 5,
                    fontSize: '0.85rem'
                }
            },
            '& .info': {
                color: '#4990A4'
            }
        }
    })
);

interface PaymentInfoProps {
    gotToNextStep: () => void;
}
export function PaymentInfo({ gotToNextStep }: PaymentInfoProps) {
    const classes = useStyles();

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
                        const { label, name, helperText } = option;
                        return (
                            <Grid item xs={12} sm={6} className={classes.formControl} key={label}>
                                {generateInputType({
                                    props: {
                                        onChange: formik.handleChange,
                                        error: formik.touched[name] && Boolean(formik.errors[name]),
                                        helperText: !formik.touched[name] && helperText ? helperText : formik.touched[name] && formik.errors[name]
                                    },
                                    option,
                                    isError: formik.touched[name] && Boolean(formik.errors[name]),
                                    handler: formik.values
                                })}
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
