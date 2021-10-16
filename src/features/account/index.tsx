import { Box, Button, Grid, Slide, TextField, Typography } from '@material-ui/core';
import { useFormik } from 'formik';
import { useState, useMemo } from 'react';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

import { DefaultSnackbar } from 'components';
import { NavBar } from 'features/user-dashboard/nav-bar';
import { ThreeDots } from 'components/css-loaders/three-dots/three-dots';
import { timeout } from 'utils';
import { useFirebaseAuthContext } from 'providers/auth/firebase';
import { useGetCurrentUserByEmailQuery, useUpdateUserMutation } from 'api/generated/graphql';
import { USER_ACCOUNT_FORM_FIELDS } from './utils';
import { useStyles } from './classes';
import EditIcon from 'components/icons/edit.svg';

const UserAccount = () => {
    const [isAuthStateIsLoading, setAuthLoadingState] = useState(false);
    const [makeEditable, setEditable] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const {
        authState: { user }
    } = useFirebaseAuthContext();

    const { data: userData } = useGetCurrentUserByEmailQuery({
        variables: {
            email: user?.email ?? ''
        }
    });

    const [updateUserMutation] = useUpdateUserMutation();
    const handleUpdateUserProfile = ({ fullname: displayName, phone, photoURL }: ProfileData) => {
        setAuthLoadingState(true);
        updateUserMutation({
            variables: {
                email: user?.email ?? '',
                displayName,
                phone,
                photoURL
            }
        })
            .then(() => {
                setAuthLoadingState(false);
                setSuccess('Great job 🎉,Profile updated successfully');
            })
            .catch(() => setError('Error updating your profile. Try again later'))
            .finally(async () => {
                await timeout(6000);
                setError('');
                setSuccess('');
            });
    };

    const formik = useFormik({
        initialValues: {
            fullname: userData?.user[0]?.display_name,
            address: '',
            phone: userData?.user[0]?.phone,
            dob: '2017-05-24',
            photoURL: userData?.user[0]?.image_url
        },
        enableReinitialize: true,
        onSubmit: values => {
            handleUpdateUserProfile(values as ProfileData);
        }
    });

    type FormValue = keyof typeof formik.initialValues;
    type ProfileData = {
        [key in Required<FormValue>]: string;
    };

    const handleCloseSnackBar = () => {
        setSuccess('');
        setError('');
    };

    const classes = useStyles();
    const style = user?.photoURL ? { backgroundImage: `url("${user?.photoURL}")`, backgroundSize: '100%', opacity: 1 } : {};

    const alertTitle = success ? 'Success' : 'Error';
    const alertSeverity = success ? 'success' : 'error';
    const showAlert = useMemo(() => Boolean(success) || Boolean(error), [success, error]);

    return (
        <>
            <Box sx={{ mb: 10 }}></Box>
            <NavBar />
            <Slide direction='right' in={true} mountOnEnter unmountOnExit appear timeout={800}>
                <div className={classes.user_account__root}>
                    <DefaultSnackbar
                        open={showAlert}
                        handleClose={handleCloseSnackBar}
                        severity={alertSeverity}
                        title={alertTitle}
                        info={success || error}
                    />
                    <div className={classes.picture} style={style}>
                        {!user?.photoURL && <CameraAltIcon color={'action'} sx={{ fontSize: '4.5rem', color: 'white' }} />}
                    </div>
                    {/* {makeEditable && (
                    PICTURE IS NOT CHANGEABLE AT THE MOMENT
                        <>
                            <Typography color={'primary'} style={{ fontSize: '1.8rem', fontWeight: 600, marginTop: 10 }}>
                                Change Picture
                            </Typography>
                            <span>Max 2MB</span>
                        </>
                    )} */}
                    <Box onClick={() => setEditable(!makeEditable)} className={classes.edit} mt={1}>
                        <img src={EditIcon} alt={'edit'} />
                    </Box>
                    <div className={classes.form_container}>
                        <form onSubmit={formik.handleSubmit}>
                            <Grid container spacing={3}>
                                {USER_ACCOUNT_FORM_FIELDS.map(({ name, label }) => {
                                    return (
                                        <Grid item xs={12} md={6} key={name}>
                                            <TextField
                                                id={name}
                                                name={name}
                                                className={classes.input}
                                                defaultValue={name}
                                                label={label}
                                                disabled={!makeEditable}
                                                type={name === 'dob' ? 'date' : 'text'}
                                                value={formik.values[name as FormValue]}
                                                onChange={formik.handleChange}
                                                error={formik.touched[name as FormValue] && Boolean(formik.errors[name as FormValue])}
                                                helperText={formik.touched[name as FormValue] && formik.errors[name as FormValue]}
                                            />
                                        </Grid>
                                    );
                                })}
                            </Grid>
                            {makeEditable && (
                                <Button color='primary' variant='contained' fullWidth type='submit' className={classes.submit}>
                                    {isAuthStateIsLoading ? <ThreeDots /> : 'Save Changes'}
                                </Button>
                            )}
                        </form>
                    </div>
                </div>
            </Slide>
        </>
    );
};

export default UserAccount;
