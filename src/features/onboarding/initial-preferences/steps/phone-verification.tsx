import { Box, Slide, TextField } from '@mui/material';
import { Button } from '@material-ui/core';

export const PhoneVerification = () => {
    return (
        <Slide direction='up' in={true} mountOnEnter unmountOnExit appear timeout={800}>
            <Box sx={{ width: '100%' }}>
                <TextField id='outlined-basic' label='Outlined' sx={{ width: '100%', marginBottom: '30px' }} fullWidth />
                <Button variant={'contained'} color={'primary'} fullWidth>
                    Verify
                </Button>
            </Box>
        </Slide>
    );
};
