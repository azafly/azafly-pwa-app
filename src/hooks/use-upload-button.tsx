import { ChangeEvent, useCallback, useState } from 'react';
import { uploadBytesResumable, getDownloadURL, ref as fbStorageRef } from 'firebase/storage';
import { storage } from 'providers/auth/firebase';

export const useUpload = () => {
    const [fileUploadLoading, setFileUploadLoading] = useState(false);
    const [fileUrl, setFileUrl] = useState('');
    const [uploadError, setUploadError] = useState<any>();
    const [alertState, setAlertState] = useState({ show: false, severity: '', title: '', text: '' });
    const handleFileUpload = useCallback((e: ChangeEvent<HTMLInputElement>, ref: string) => {
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
                setUploadError(uploadingError);
            },
            () => {
                setFileUploadLoading(false);
                getDownloadURL(uploadTask.snapshot.ref).then(url => {
                    setFileUrl(url);
                    setAlertState(prevState => ({
                        ...prevState,
                        show: true,
                        text: 'Profile updated successfully 🎉',
                        severity: 'success',
                        title: 'Success'
                    }));
                    setFileUploadLoading(false);
                });
            }
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {
        alertState,
        fileUploadLoading,
        fileUrl,
        handleFileUpload,
        uploadError
    };
};
