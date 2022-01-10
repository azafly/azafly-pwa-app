import { Box, Slide, Stack } from '@mui/material';
import { Button, Typography } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PostAddIcon from '@mui/icons-material/PostAdd';

import { DefaultSnackbar, UploadButton } from 'components';
import { Dispatch, RootState } from 'app/store';
import { storage } from 'providers/auth/firebase';
import { ThreeDots } from 'components/css-loaders/three-dots';
import { UpdateKycDocUrlMutationVariables, useUpdateKycDocUrlMutation, useUpdateNewUserMutation } from 'api/generated/graphql';
import { uploadBytesResumable, getDownloadURL, ref as fbStorageRef } from 'firebase/storage';
import Modal from '../modal';

export const KYCDocuments = () => {
    const [fileUploadLoading, setFileUploadLoading] = useState(false);
    const [alertState, setAlertState] = useState({ show: false, severity: '', title: '', text: '' });

    const { user, hasuraUser } = useSelector((state: RootState) => state.auth);
    const { address, country, document_url, phoneNumber: phone } = useSelector((state: RootState) => state.onboarding);
    const dispatch = useDispatch<Dispatch>();

    const handleCloseSnackBar = () => {
        setAlertState({ ...alertState, show: false });
    };

    const userData = hasuraUser ?? {};

    const [handleUpdateDocUrl] = useUpdateKycDocUrlMutation();
    const [updateNewUserMutation] = useUpdateNewUserMutation({
        variables: {
            email: user?.email ?? '',
            address,
            country: country.code,
            document_url,
            phone
        }
    });

    const handleSetNoLongerNewUser = () => {
        updateNewUserMutation();
    };
    const handleFileUpload = (e: ChangeEvent<HTMLInputElement>, ref: string) => {
        const file = e?.target?.files?.[0];
        if (!file) return;
        const imagesRef = fbStorageRef(storage, ref);
        const uploadTask = uploadBytesResumable(imagesRef, file);

        uploadTask.on(
            'state_changed',
            snapshot => {
                if (snapshot.state === 'running') {
                    setFileUploadLoading(true);
                }
            },
            uploadingError => {
                setFileUploadLoading(false);
                setAlertState({ ...alertState, show: true, text: 'Error uploading your documents', severity: 'error', title: 'Error' });
                console.log(uploadingError);
            },
            () => {
                setFileUploadLoading(false);
                getDownloadURL(uploadTask.snapshot.ref).then(url => {
                    dispatch.onboarding.setDocumentUrl(url);
                    setAlertState({ ...alertState, show: true, text: 'Profile updated successfully 🎉', severity: 'success', title: 'Success' });
                    setFileUploadLoading(false);
                    handleSetNoLongerNewUser();
                    const variables: UpdateKycDocUrlMutationVariables = { id: userData?.id ?? '', document_url: url };
                    handleUpdateDocUrl({ variables }).catch(error => console.log(error));
                });
            }
        );
    };

    const { show, severity, text, title } = alertState;

    const history = useHistory();
    const successCallBack = () => {
        history.push('/dashboard');
    };

    return (
        <>
            <DefaultSnackbar open={show} handleClose={handleCloseSnackBar} severity={severity as 'error' | 'success'} title={title} info={text} />
            {severity === 'success' && <Modal successCallBack={successCallBack} />}
            {severity !== 'success' && (
                <Slide direction='down' in={true} mountOnEnter unmountOnExit appear timeout={800}>
                    <Box sx={{ width: '100%' }}>
                        <Typography variant={'h6'} gutterBottom align={'center'} sx={{ fontWeight: 700, fontFamily: 'Nunito', marginBottom: 2 }}>
                            {'Update your Identification document'}
                        </Typography>
                        <Typography paragraph gutterBottom align={'center'} sx={{ fontWeight: 400, fontFamily: 'Nunito', marginBottom: 2 }}>
                            {'Upload a means of identification as a part of Know-Your-Customer(KYC)'}
                        </Typography>

                        <Typography
                            paragraph
                            color={'brown'}
                            sx={{ fontSize: '0.86rem', fontFamily: 'Nunito', marginBottom: 2, fontStyle: 'italic' }}
                        >
                            {' '}
                            {'*You will not be able to perform operations above $1000 until you are verified'}{' '}
                        </Typography>
                        {fileUploadLoading ? (
                            <ThreeDots variantColor={'base'} />
                        ) : (
                            <Stack direction={'row'} spacing={2} justifyContent={'center'}>
                                <UploadButton
                                    label={'Upload document'}
                                    icon={<PostAddIcon />}
                                    uploadCallback={e => handleFileUpload(e, `/images/user-kyc/${user?.uid}-id`)}
                                />

                                <Link to={'/dashboard'} style={{ textDecoration: 'none' }}>
                                    <Button
                                        variant={'contained'}
                                        color={'secondary'}
                                        sx={{ textTransform: 'capitalize', width: 'max-content' }}
                                        fullWidth
                                        onClick={() => handleSetNoLongerNewUser()}
                                        disabled={fileUploadLoading}
                                    >
                                        Skip for Now
                                    </Button>
                                </Link>
                            </Stack>
                        )}
                    </Box>
                </Slide>
            )}
        </>
    );
};
