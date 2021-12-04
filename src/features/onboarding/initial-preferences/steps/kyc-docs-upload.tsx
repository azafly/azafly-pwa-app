import { Box, Chip, Slide, Stack } from '@mui/material';
import { Button, Typography } from '@mui/material';
import PostAddIcon from '@mui/icons-material/PostAdd';

export const KYCDocuments = () => {
    return (
        <Slide direction='up' in={true} mountOnEnter unmountOnExit appear timeout={800}>
            <Box sx={{ width: '100%' }}>
                <Typography variant={'h6'} gutterBottom align={'center'} sx={{ fontWeight: 700, fontFamily: 'Nunito', marginBottom: 2 }}>
                    {'Update your KYC documents'}
                </Typography>
                <Typography paragraph gutterBottom align={'center'} sx={{ fontWeight: 400, fontFamily: 'Nunito', marginBottom: 2 }}>
                    {'Upload a means of identification as a part of Know-Your-Customer(KYC)'}
                </Typography>
                <Typography paragraph color={'red'} sx={{ fontSize: '0.86rem', fontFamily: 'Nunito', marginBottom: 2, fontStyle: 'italic' }}>
                    {' '}
                    {'*You will not be able to perform operations above $1000 until you are verified'}{' '}
                </Typography>
                <Stack direction={'row'} spacing={2}>
                    <Button
                        variant={'contained'}
                        color={'secondary'}
                        sx={{ textTransform: 'capitalize', backgroundColor: '#4990a4' }}
                        endIcon={<PostAddIcon />}
                        fullWidth
                    >
                        Upload Documents
                    </Button>
                    <Button variant={'contained'} color={'primary'} sx={{ textTransform: 'capitalize', backgroundColor: '#0d324d' }} fullWidth>
                        Skip for Now
                    </Button>
                </Stack>
            </Box>
        </Slide>
    );
};
