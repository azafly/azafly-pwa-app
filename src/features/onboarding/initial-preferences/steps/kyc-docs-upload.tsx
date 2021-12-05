import { ChangeEvent, useState } from 'react';
import { Box, Slide, Stack } from '@mui/material';
import { Button, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { Link } from 'react-router-dom';

import client from 'libs/apollo-client';

import { DefaultSnackbar, UploadButton } from 'components';
import { RootState } from 'app/store';
import { storage } from 'providers/auth/firebase';
import Modal from '../modal';
import { ThreeDots } from 'components/css-loaders/three-dots';

export const KYCDocuments = () => {
    const [fileUploadLoading, setFileUploadLoading] = useState(false);
    const [alertState, setAlertState] = useState({ show: false, severity: '', title: '', text: '' });

    const { user } = useSelector((state: RootState) => state.auth);

    const handleCloseSnackBar = () => {
        setAlertState({ ...alertState, show: false });
    };

    const handleFileUpload = (e: ChangeEvent<HTMLInputElement>, ref: string) => {
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
                setAlertState({ ...alertState, show: true, text: 'Error uploading your documents', severity: 'error', title: 'Error' });
            },
            () => {
                storageRef.snapshot.ref.getDownloadURL().then(() => {
                    setAlertState({ ...alertState, show: true, text: 'Profile updated successfully 🎉', severity: 'success', title: 'Success' });
                    setFileUploadLoading(false);
                    client.refetchQueries({
                        include: ['getUserTransactions', 'getUserPendingOffers', 'getCurrentUserByEmail']
                    });
                });
            }
        );
    };

    const { show, severity, text, title } = alertState;

    return (
        <>
            <DefaultSnackbar open={show} handleClose={handleCloseSnackBar} severity={severity as 'error' | 'success'} title={title} info={text} />
            {severity === 'success' && <Modal />}
            {severity !== 'success' && (
                <Slide direction='up' in={true} mountOnEnter unmountOnExit appear timeout={800}>
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
