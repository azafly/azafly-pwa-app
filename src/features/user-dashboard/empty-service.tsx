import { Box, Button, Card, CardActions, CardMedia, Chip, Typography } from '@material-ui/core';
import { Dispatch, SetStateAction, memo } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

import { EmptyServiceSvgComponent } from 'components/illustrations';
import { useEmptyCardStyles } from './classes';
import { useFirebaseAuthContext } from 'providers/auth/firebase';

const services = ['WES', 'IELTS', 'School Fees', 'Medical Bills', 'Others'];

interface EmptyCardContainerProps {
    setHighlightEmailVerify: Dispatch<SetStateAction<boolean>>;
}
export const EmptyCardContainer = memo(function EmptyCardContainer({ setHighlightEmailVerify }: EmptyCardContainerProps) {
    const classes = useEmptyCardStyles();
    const {
        authState: { user }
    } = useFirebaseAuthContext();

    const emailVerified = user?.emailVerified;

    const handleSetHighlight = () => !emailVerified && setHighlightEmailVerify(true);

    return (
        <>
            <Card className={classes.empty_card_root}>
                <Typography variant={'h5'} className={classes.nothing}>
                    {`You do not have any transactions yet`}{' '}
                </Typography>
                <CardMedia>
                    <EmptyServiceSvgComponent />
                </CardMedia>
                <CardActions>
                    <Link
                        to='/payment'
                        className={clsx(classes.button, {
                            [classes.disabled]: !emailVerified
                        })}
                        onClick={handleSetHighlight}
                        style={{ textDecoration: 'none' }}
                    >
                        <Button
                            className={clsx(classes.button, {
                                [classes.disabled]: !emailVerified
                            })}
                            title={emailVerified ? 'Go to payments' : 'Verify your  email to proceed'}
                            color={'primary'}
                            variant={'contained'}
                            size={'medium'}
                        >
                            {'Start a new payment'}
                        </Button>
                    </Link>
                </CardActions>
                <Typography paragraph align='center'>
                    {' '}
                    Popular:{' '}
                </Typography>{' '}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                        flexWrap: 'wrap',
                        margin: '0px 10px 30px 10px'
                    }}
                >
                    {services.map(service => (
                        <Link
                            to='/payment'
                            key={service}
                            style={{ textDecoration: 'none' }}
                            className={clsx({
                                [classes.disabled]: !emailVerified
                            })}
                        >
                            {' '}
                            <Chip size={'medium'} label={service} className={classes.chip} color={'secondary'} clickable={true} />
                        </Link>
                    ))}
                </Box>
            </Card>
        </>
    );
});
