import { Box, Button, Card, CardActions, CardContent, Typography, Theme } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Skeleton from 'react-loading-skeleton';

import AddIcon from '@mui/icons-material/Add';
import PaymentsIcon from '@mui/icons-material/Payments';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        card__container: {
            padding: 10,
            border: '1px solid #DCDCDC',
            boxShadow: '0 2px 16px 0 rgba(0, 0, 0, .08)'
        },
        action: {
            fontSize: '0.95em',
            fontWeight: 600,
            textTransform: 'capitalize',
            color: theme.colors.base
        },
        typography: {
            fontSize: '1rem',
            fontWeight: 700,
            fontFamily: 'Nunito'
        }
    })
);

interface LocalWalletCardProps {
    loading: boolean;
}

export default function LocalWalletCard({ loading }: LocalWalletCardProps) {
    const classes = useStyles();

    return (
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
                        <Button endIcon={<PaymentsIcon />} size='small' className={classes.action}>
                            Withdraw
                        </Button>
                    )}
                </Box>
            </CardActions>
        </Card>
    );
}
