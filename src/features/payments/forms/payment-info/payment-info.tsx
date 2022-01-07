import { Button, Grid, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useFormik } from 'formik';
import { v4 as uuidv4 } from 'uuid';
import UploadFileIcon from '@mui/icons-material/FilePresentSharp';

import { PAYMENT_INFO, validationSchema, initialValues, generateInputType } from './form-fields';
import { Dispatch, RootState } from 'app/store';
import { UploadButton } from 'components';
import { useUpload } from 'hooks/use-upload-button';
import { useUserContext } from 'hooks/use-user-context';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            padding: '80px',
            justifyContent: 'center',
            backgroundColor: 'rgb(254,254,250)',
            margin: 50,
            width: '100%',
            borderRadius: 18,
            [theme.breakpoints.up('sm')]: {
                border: '1px solid #DCDCDC',
                transition: '200ms all cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: '0 2px 4px 0 rgba(218,228,239,0.5)'
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
        },
        uploadHelperText: {
            fontSize: '0.7rem',
            paddingTop: 10,
            color: theme.colors.base
        }
    })
);

interface PaymentInfoProps {
    gotToNextStep: () => void;
}
export function PaymentInfo({ gotToNextStep }: PaymentInfoProps) {
    const classes = useStyles();

    const {
        payments: { offerBasedOnRate, DIRECT_activeStep, DIRECT_paymentIntentPayload },
        auth: { hasuraUser }
    } = useSelector(({ auth, payments }: RootState) => ({ auth, payments }));
    const dispatchStore = useDispatch<Dispatch>();

    const { handleFileUpload, fileUploadLoading, fileUrl } = useUpload();
    const { user } = useUserContext();

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema,
        onSubmit: values => {
            gotToNextStep();
            console.log(values);
            dispatchStore.payments.DIRECT_setPaymentIntentPayload({ ...values, fileUrl, name: hasuraUser?.display_name });
        }
    });

    const uploadHelperText =
        fileUrl || DIRECT_paymentIntentPayload.document_url ? 'Document Uploaded. Upload a new one?' : 'Upload a supporting Document e.g an invoice';

    useEffect(() => {
        const getDefaultValue = (key: string) => {
            switch (key) {
                case 'references':
                    return formik.setFieldValue(key, DIRECT_paymentIntentPayload?.references ?? '');
                case 'by':
                    return formik.setFieldValue(key, DIRECT_paymentIntentPayload?.by ?? 'My Self');
                case 'purpose':
                    return formik.setFieldValue(key, DIRECT_paymentIntentPayload?.purpose ?? 'Education');
                default:
                    return null;
            }
        };
        PAYMENT_INFO.forEach(({ name }) => getDefaultValue(name));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [DIRECT_paymentIntentPayload]);

    return (
        <form className={classes.root} autoComplete='off' onSubmit={formik.handleSubmit}>
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
                                    defaultValue: formik.values[name],
                                    isError: formik.touched[name] && Boolean(formik.errors[name])
                                })}
                            </Grid>
                        );
                    })}
                    <Grid item xs={12} sm={6} className={classes.formControl}>
                        <Stack>
                            <Button
                                variant='contained'
                                color={'default'}
                                style={{ textTransform: 'none', fontSize: '12px', fontWeight: 400, cursor: 'pointer', width: '100%', height: 40 }}
                                endIcon={
                                    <UploadButton
                                        label={'Upload Document'}
                                        icon={<UploadFileIcon />}
                                        loading={fileUploadLoading}
                                        uploadCallback={e =>
                                            handleFileUpload(e, `user-transactions/${user?.id}/${offerBasedOnRate?.payment_offer_id ?? uuidv4()}`)
                                        }
                                    />
                                }
                            />
                            <Typography paragraph color={'secondary'} align={'center'} className={classes.uploadHelperText}>
                                {uploadHelperText}
                            </Typography>
                        </Stack>
                    </Grid>
                </Grid>
                <Stack direction={'row'} spacing={3} sx={{ mt: 1 }}>
                    <Button
                        color='secondary'
                        variant='contained'
                        fullWidth
                        style={{ marginTop: 10 }}
                        onClick={() => dispatchStore.payments.DIRECT_setActiveStep(DIRECT_activeStep - 1)}
                    >
                        Back
                    </Button>
                    <Button color='primary' variant='contained' fullWidth type='submit' style={{ marginTop: 10 }}>
                        Submit
                    </Button>
                </Stack>
            </div>
        </form>
    );
}
