import { Box, Button, Card, CardActions, CardContent, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import AddIcon from '@mui/icons-material/Add';
import PaymentsIcon from '@mui/icons-material/Payments';

const useStyles = makeStyles(() =>
    createStyles({
        card__container: {
            padding: 10
        },
        action: {
            fontSize: '0.85em',
            fontWeight: 400,
            textTransform: 'capitalize'
        },
        typography: {
            fontSize: '1rem',
            fontWeight: 700,
            fontFamily: 'Nunito'
        }
    })
);

interface LocalWalletCardProps {
    handleOpen: () => void;
    loading: boolean;
}

export default function LocalWalletCard({ handleOpen, loading }: LocalWalletCardProps) {
    const classes = useStyles();

    return (
        <SkeletonTheme baseColor='' highlightColor='#eef5f7' borderRadius='0.5rem' duration={4}>
            <Card elevation={1} className={classes.card__container}>
                <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        {loading ? (
                            <Skeleton width={'10ch'} />
                        ) : (
                            <Typography className={classes.typography} gutterBottom>
                                <span style={{ fontSize: '1.2rem' }}> 🇳🇬 </span> NGN
                            </Typography>
                        )}
                        {loading ? (
                            <Skeleton width={'15ch'} />
                        ) : (
                            <Typography variant='body2' className={classes.typography}>
                                {'₦750,789'}
                            </Typography>
                        )}
                    </Box>
                </CardContent>
                <CardActions>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                        {loading ? (
                            <Skeleton width={'10ch'} />
                        ) : (
                            <Button endIcon={<AddIcon />} size='small' className={classes.action}>
                                Fund Account
                            </Button>
                        )}
                        {loading ? (
                            <Skeleton width={'10ch'} />
                        ) : (
                            <Button endIcon={<PaymentsIcon />} size='small' className={classes.action} onClick={handleOpen}>
                                Withdraw
                            </Button>
                        )}
                    </Box>
                </CardActions>
            </Card>
        </SkeletonTheme>
    );
}
