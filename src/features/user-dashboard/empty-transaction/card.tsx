import { Box, Button, Card, CardActions, CardMedia, Chip, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { memo, ReactNode } from 'react';
import clsx from 'clsx';

import { EmptyServiceSvgComponent } from 'components/illustrations';
import { VerificationRequestBox } from './verification-request-box';

import { useEmptyCardStyles } from '../classes';
import { RootState } from 'app/store';
import { useSelector } from 'react-redux';

const services = ['WES', 'IELTS', 'School Fees', 'Medical Bills', 'Others'];

interface EmptyCardContainerProps {
    handleSendVerificationEmail: () => void;
    emailLink: ReactNode;
    loading: boolean;
}
export const EmptyCardContainer = memo(function EmptyCardContainer({ emailLink, handleSendVerificationEmail, loading }: EmptyCardContainerProps) {
    const classes = useEmptyCardStyles();
    const { user } = useSelector((state: RootState) => state.auth);

    const emailVerified = user?.emailVerified;

    return (
        <div className={classes.empty_card_root}>
            {!loading && (
                <>
                    {!emailVerified && <VerificationRequestBox emailLink={emailLink} handleSendVerificationEmail={handleSendVerificationEmail} />}
                    <Card className={classes.card}>
                        <Typography variant={'h5'} className={classes.nothing}>
                            {`You do not have any transactions yet`}{' '}
                        </Typography>
                        <CardMedia>
                            <EmptyServiceSvgComponent />
                        </CardMedia>
                        {/* // TODO remove manual toggle */}
                        {true && (
                            <>
                                <CardActions>
                                    <Link
                                        to='/payment'
                                        className={clsx(classes.button, {
                                            [classes.disabled]: !emailVerified
                                        })}
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
                            </>
                        )}
                    </Card>
                </>
            )}
        </div>
    );
});
