import { ChangeEvent, Dispatch, memo, SetStateAction } from 'react';
import { Box, Typography } from '@material-ui/core';

import EditIcon from 'components/icons/edit.svg';
import { ThreeDots } from 'components/css-loaders/three-dots/three-dots';
import { UploadButton } from 'components';
import { RootState } from 'app/store';
import { useSelector } from 'react-redux';

interface ProfilePictureProps {
    classes: Record<string, string>;
    isEditable: boolean;
    handleFileUpload: (e: ChangeEvent<HTMLInputElement>, ref: string) => void;
    setIsEditable: Dispatch<SetStateAction<boolean>>;
    fileUploadIsLoading?: boolean;
}

export const ProfilePicture = memo(function ProfilePicture({
    classes,
    isEditable,
    handleFileUpload,
    setIsEditable,
    fileUploadIsLoading
}: ProfilePictureProps) {
    const { user } = useSelector((state: RootState) => state.auth);

    const style = user?.photoURL ? { backgroundImage: `url("${user?.photoURL}")`, backgroundSize: '100%', opacity: 1 } : {};
    return (
        <div>
            <Box className={classes.picture} style={style}>
                {fileUploadIsLoading ? (
                    <ThreeDots />
                ) : (
                    !user?.photoURL && <UploadButton uploadCallback={e => handleFileUpload(e, `/images/user-profile/${user?.displayName}`)} />
                )}
            </Box>
            {isEditable && (
                <Box textAlign={'center'}>
                    <Typography color={'primary'} style={{ fontSize: '1.8rem', fontWeight: 600, marginTop: 10 }}>
                        Change Picture
                    </Typography>
                    <span>Max 2MB</span>
                </Box>
            )}
            <Box onClick={() => setIsEditable(!isEditable)} className={classes.edit} mt={1}>
                <img src={EditIcon} alt={'edit'} />
            </Box>
        </div>
    );
});
