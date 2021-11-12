import { Box, Button, Grid, Slide, TextField } from '@material-ui/core';
import { useEffect, useState, useMemo, ChangeEvent } from 'react';
import { useFormik } from 'formik';

import { DefaultSnackbar } from 'components';
import { FilesContainer } from './files-container';
import { NavBar } from 'features/user-dashboard/nav-bar';
import { ProfilePicture } from './profile-picture';
import { ThreeDots } from 'components/css-loaders/three-dots/three-dots';
import { timeout } from 'libs';
import { UploadIconText } from './upload-icon-text';
import { useFirebaseAuthContext, storage } from 'providers/auth/firebase';
import { useGetCurrentUserByEmailQuery, useUpdateUserMutation } from 'api/generated/graphql';
import { USER_ACCOUNT_FORM_FIELDS } from './utils';
import { useStyles } from './classes';

const UserAccount = () => {
    const [error, setError] = useState('');
    const [files, setFiles] = useState<string[]>([]);
    const [fileUploadLoading, setFileUploadLoading] = useState(false);
    const [isAuthStateIsLoading, setAuthLoadingState] = useState(false);
    const [makeEditable, setEditable] = useState(false);
    const [success, setSuccess] = useState('');

    const {
        authState: { user },
        handleUpdateFirebaseProfile
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
                setSuccess('Great job!! Profile updated successfully 🙌');
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
            fullname: userData?.users[0]?.display_name,
            address: '',
            phone: userData?.users[0]?.phone,
            dob: '2017-05-24',
            photoURL: userData?.users[0]?.image_url
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

    const handleUpload = (e: ChangeEvent<HTMLInputElement>, ref: string) => {
        const file = e?.target?.files?.[0];
        if (!file) return;
        const storageRef = storage.ref(ref).put(file);
        storageRef.on(
            'state-changed',
            snapshot => {
                if (snapshot.state === 'running') {
                    setFileUploadLoading(true);
                }
            },
            () => {
                setError('Error uploading your documents');
            },
            () => {
                storageRef.snapshot.ref.getDownloadURL().then(photoURL => {
                    setSuccess('Great job 🎉!! Profile updated successfully');
                    setFileUploadLoading(false);
                    handleUpdateFirebaseProfile(user, { photoURL });
                    //TODO update in Hasura
                });
            }
        );
    };

    useEffect(() => {
        const fetchImages = async () => {
            const result = await storage.ref().child('/images/user-kyc').listAll();
            const urlPromises = result.items.map(imageRef => imageRef.getDownloadURL());
            return Promise.all(urlPromises);
        };

        const loadImages = async () => {
            const urls = await fetchImages();
            setFiles(urls);
        };
        loadImages();
    }, []);

    /* TODO
    -  Make docs previewable
    -  Disable everything until click is done
    -  Immediately replace image across app with new profile pics. (update in FB and Hasura)
    -  Handle error
    */

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
                    <ProfilePicture
                        classes={classes}
                        isEditable={makeEditable}
                        handleFileUpload={handleUpload}
                        setIsEditable={setEditable}
                        fileUploadIsLoading={fileUploadLoading}
                    />
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
                                <UploadIconText
                                    classes={classes}
                                    isEditable={makeEditable}
                                    handleFileUpload={handleUpload}
                                    setIsEditable={setEditable}
                                    fileUploadIsLoading={fileUploadLoading}
                                />
                            </Grid>
                            <FilesContainer files={files} className={classes.files} />
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
