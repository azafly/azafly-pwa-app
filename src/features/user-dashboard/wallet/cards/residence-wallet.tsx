import { Box, Button, Card, CardActions, CardContent, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import AddIcon from '@mui/icons-material/Add';
import FlipCameraAndroidIcon from '@mui/icons-material/FlipCameraAndroid';

const useStyles = makeStyles(() =>
    createStyles({
        card_container: {
            padding: 10,
            border: '2px solid #DCDCDC',
            boxShadow: '0 2px 16px 0 rgba(0, 0, 0, .08)'
        },
        action: {
            fontSize: '0.85em',
            fontWeight: 700,
            textTransform: 'capitalize'
        },
        typography: {
            fontSize: '1.1rem',
            fontWeight: 700,
            fontFamily: 'Nunito'
        }
    })
);

interface ResidenceCardProps {
    handleOpen: () => void;
    loading: boolean;
}

export default function ResidenceWalletCard({ handleOpen, loading }: ResidenceCardProps) {
    const classes = useStyles();
    return (
        <SkeletonTheme baseColor='' highlightColor='#4990A4' borderRadius='0.5rem' duration={4}>
            <Card elevation={1} className={classes.card_container}>
                <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        {loading ? (
                            <Skeleton width={'10ch'} />
                        ) : (
                            <Typography className={classes.typography} gutterBottom>
                                <span style={{ fontSize: '1.2rem' }}> 🇬🇧 </span> GBP
                            </Typography>
                        )}
                        {loading ? (
                            <Skeleton width={'15ch'} />
                        ) : (
                            <Typography variant='body2' className={classes.typography}>
                                {'£1,340'}
                            </Typography>
                        )}
                    </Box>
                </CardContent>
                <CardActions>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                        <Button endIcon={<AddIcon />} size='small' className={classes.action}>
                            Fund Account
                        </Button>
                        <Button endIcon={<FlipCameraAndroidIcon />} size='small' className={classes.action}>
                            convert
                        </Button>
                    </Box>
                </CardActions>
            </Card>
        </SkeletonTheme>
    );
}
