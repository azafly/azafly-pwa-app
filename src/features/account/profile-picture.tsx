import { Badge } from '@material-ui/core';
import { ChangeEvent, memo, useState } from 'react';
import { getDownloadURL, ref as fbStorageRef, uploadBytesResumable } from 'firebase/storage';
import { useSelector } from 'react-redux';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

import { delay } from 'libs';
import { RootState } from 'app/store';
import { storage } from 'providers/auth/firebase';
import { ThreeDots } from 'components/css-loaders/three-dots/three-dots';
import { UploadButton } from 'components';
import { useUpdateProfileImageUrlMutation, UpdateProfileImageUrlMutationVariables } from 'api/generated/graphql';
import { useUserContext } from 'hooks/use-user-context';

interface ProfilePictureProps {
    classes: Record<string, string>;
}

export const ProfilePicture = memo(function ProfilePicture({ classes }: ProfilePictureProps) {
    const [fileUploadLoading, setFileUploadLoading] = useState(false);
    const [error, setError] = useState('');

    const { user } = useSelector((state: RootState) => state.auth);
    const { user: userData, loading } = useUserContext();

    const [handleUpdateDocUrl] = useUpdateProfileImageUrlMutation();

    const handleUpload = (e: ChangeEvent<HTMLInputElement>, ref: string) => {
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
                setError('Error uploading your documents');
                console.log(uploadingError);
            },
            () => {
                delay(5000);
                setFileUploadLoading(false);
                getDownloadURL(uploadTask.snapshot.ref).then(photoURL => {
                    const variables: UpdateProfileImageUrlMutationVariables = { id: userData?.id ?? '', photoURL };
                    handleUpdateDocUrl({ variables }).catch(() => console.log(error));
                });
            }
        );
    };

    const style = userData?.image_url ? { backgroundImage: `url("${userData?.image_url}")`, backgroundSize: '100%', opacity: 1 } : {};
    return (
        <Badge
            className={classes.picture}
            style={style}
            overlap='circular'
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            badgeContent={
                <UploadButton
                    icon={<CameraAltIcon style={{ color: 'black', width: 40, height: 40 }} />}
                    uploadCallback={e => handleUpload(e, `/images/user-profile/${user?.displayName}`)}
                />
            }
        >
            {(loading || fileUploadLoading) && <ThreeDots variantColor={'base'} />}
        </Badge>
    );
});
