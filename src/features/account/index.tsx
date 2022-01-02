import { Box, Grid, TextField } from '@material-ui/core';
import { Fade } from '@mui/material';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { useState, useMemo } from 'react';
import EditIcon from 'components/icons/edit.svg';

import { DefaultSnackbar } from 'components';
import { delay } from 'libs';
import { FilesContainer } from './files-container';
import { getApolloClient } from '../../libs/apollo-client';
import { ProfilePicture } from './profile-picture';
import { RootState } from 'app/store';
import { UploadIconText } from './upload-icon-text';
import { USER_ACCOUNT_FORM_FIELDS } from './utils';
import { useUpdateUserMutation } from 'api/generated/graphql';
import { useUserContext } from 'hooks/use-user-context';

import { useStyles } from './classes';

const UserAccount = () => {
    const [error, setError] = useState('');
    const [makeEditable, setEditable] = useState(false);
    const [success, setSuccess] = useState('');

    const { user, token } = useSelector((state: RootState) => state.auth);
    const { user: userData } = useUserContext();

    const [updateUserMutation] = useUpdateUserMutation();

    const handleUpdateUserProfile = ({ fullname: displayName, phone }: ProfileData) => {
        updateUserMutation({
            variables: {
                email: user?.email ?? '',
                displayName,
                phone
            }
        })
            .then(() => {
                setSuccess('Profile updated successfully 🙌');
                getApolloClient(token).refetchQueries({
                    include: ['getCurrentUserByEmail']
                });
            })
            .catch(() => setError('Error updating your profile. Try again later'))
            .finally(async () => {
                await delay(6000);
                setError('');
                setSuccess('');
            });
    };

    const formik = useFormik({
        initialValues: {
            fullname: userData?.display_name,
            address: userData?.address,
            phone: userData?.phone,
            dob: '2017-05-24',
            photoURL: userData?.image_url
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

    const alertTitle = success ? 'Success' : 'Error';
    const alertSeverity = success ? 'success' : 'error';
    const showAlert = useMemo(() => Boolean(success) || Boolean(error), [success, error]);

    return (
        <Fade in mountOnEnter unmountOnExit appear timeout={800}>
            <div className={classes.user_account__root}>
                <DefaultSnackbar
                    open={showAlert}
                    handleClose={handleCloseSnackBar}
                    severity={alertSeverity}
                    title={alertTitle}
                    info={success || error}
                />
                <ProfilePicture classes={classes} />
                <Box onClick={() => setEditable(!makeEditable)} className={classes.edit} mt={1}>
                    <img src={EditIcon} alt={'edit'} />
                </Box>
                <div className={classes.form_container}>
                    <form onSubmit={formik.handleSubmit}>
                        <Grid container spacing={3}>
                            {USER_ACCOUNT_FORM_FIELDS.map(({ name, label, helperText }) => {
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
                                            helperText={
                                                !formik.touched[name as FormValue] && helperText
                                                    ? helperText
                                                    : formik.touched[name as FormValue] && formik.errors[name as FormValue]
                                            }
                                            FormHelperTextProps={{
                                                className: 'info'
                                            }}
                                        />
                                    </Grid>
                                );
                            })}
                        </Grid>
                    </form>
                    <UploadIconText classes={classes} />
                    <FilesContainer files={[userData?.document_url ?? '']} className={classes.files} />
                </div>
            </div>
        </Fade>
    );
};

export default UserAccount;
