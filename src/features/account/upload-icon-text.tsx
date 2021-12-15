import { Box, Button, Grid, Typography } from '@material-ui/core';
import { memo } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import { Dispatch as ReduxDispatch } from 'app/store';

interface UploadIconTextProps {
    classes: Record<string, string>;
}
export const UploadIconText = memo(function UploadIconText({ classes }: UploadIconTextProps) {
    const history = useHistory();
    const dispatch = useDispatch<ReduxDispatch>();

    const handleGoToUpload = () => {
        dispatch.onboarding.setActiveStep('kyc');
        history.push({
            pathname: '/onboarding-update',
            state: {
                referer: '/account'
            }
        });
    };

    return (
        <Grid item xs={12}>
            <Box mt={5} sx={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ alignSelf: 'center' }}>
                    <Button variant={'contained'} color={'primary'} onClick={handleGoToUpload} style={{ margin: 30 }}>
                        Go to upload document
                    </Button>
                </div>
                <Typography className={classes.kyc_title} variant={'h6'} gutterBottom>
                    My Identification Documents
                </Typography>
            </Box>
        </Grid>
    );
});
