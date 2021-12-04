import { ChangeEvent, Dispatch, memo, SetStateAction } from 'react';
import { Box, Grid, Typography } from '@material-ui/core';

import { ThreeDots } from 'components/css-loaders/three-dots/three-dots';
import { UploadButton } from 'components';
import { RootState } from 'app/store';
import { useSelector } from 'react-redux';

interface UploadIconTextProps {
    classes: Record<string, string>;
    isEditable: boolean;
    handleFileUpload: (e: ChangeEvent<HTMLInputElement>, ref: string) => void;
    setIsEditable: Dispatch<SetStateAction<boolean>>;
    fileUploadIsLoading?: boolean;
}
export const UploadIconText = memo(function UploadIconText({ classes, handleFileUpload, fileUploadIsLoading }: UploadIconTextProps) {
    // TODO manage is editable
    const { user } = useSelector((state: RootState) => state.auth);

    return fileUploadIsLoading ? (
        <ThreeDots />
    ) : (
        <Grid item xs={12}>
            <Box mt={5} textAlign={'center'} sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                <Typography className={classes.kyc_title} variant={'h6'} align={'center'} gutterBottom>
                    My Identification Documents
                </Typography>
                <div>
                    <UploadButton
                        label={'Upload a new document'}
                        className={`${classes.upload}`}
                        uploadCallback={e => handleFileUpload(e, `/images/user-kyc/${user?.uid}-${new Date().toUTCString()}`)}
                    />
                </div>
            </Box>
        </Grid>
    );
});
