import { Box, Typography, Hidden } from '@material-ui/core';
import { useState } from 'react';
import ErrorIcon from '@mui/icons-material/Error';

import { CardContainer } from './card-container';
import { EmptyCardContainer } from './empty-service';
import { DefaultSnackbar, SpeedDialTooltip } from 'components';
import { useDashboardStyles, StyledBadge } from './classes';
import { Stack } from '@mui/material';
import UserNavBar from './bottom-navbar';

// queries and co
import { useGetUserTransactionsQuery, useGetCurrentUserByEmailQuery } from 'api/generated/graphql';
import { useFirebaseAuthContext } from 'providers/auth/firebase';
import { SideBar } from './side-bar';
import { ThreeDots } from 'components/css-loaders/three-dots/three-dots';

export default function Dashboard() {
    const [openSpeedDial, setOpenSpeedDial] = useState(false);
    const [isSendingLink, setLoading] = useState(false);
    const [highlightEmailVerify, setHighlightEmailVerify] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [verificationEmailSent, setSent] = useState('');
    const [openSnackBar, setOpenSnackBar] = useState(false);

    const {
        authState: { user }
    } = useFirebaseAuthContext();

    const emailVerified = user?.emailVerified;
    const { data: userData } = useGetCurrentUserByEmailQuery({
        variables: {
            email: user?.email ?? ''
        }
    });

    const id = userData?.users[0]?.id;
    const { data: transactionData, error, loading } = useGetUserTransactionsQuery({ variables: { id } });
    const transactions = transactionData?.transaction;

    const handleSpeedDialVisibility = () => {
        setHidden(prevHidden => !prevHidden);
    };

    const handleOpenSpeedDial = () => {
        setOpenSpeedDial(true);
    };

    const handleSpeedDialClose = () => {
        setOpenSpeedDial(false);
    };

    const classes = useDashboardStyles();
    const ripples = StyledBadge();

    const handleSendVerificationEmail = () => {
        if (localStorage.getItem('verification_email_sent')) {
            setOpenSnackBar(true);
            setSent('Verification Email already sent to your email. Kindly check your email to verify');
            return;
        }
        setLoading(true);
        user?.sendEmailVerification()
            .then(() => {
                setOpenSnackBar(true);
                setSent('Verification Link sent successfully. Check your email to verify');
                localStorage.setItem('verification_email_sent', 'true');
                setLoading(false);
            })
            .catch(() => {
                setOpenSnackBar(true);
                setSent('Error sending Verification Link');
                setLoading(false);
            });
    };

    const emailLink = isSendingLink ? (
        <ThreeDots />
    ) : (
        <>
            <ErrorIcon className={ripples.badge} />
            {' You need to verify your email to make payments. Click here to get a new Verification Email'}
        </>
    );
    const className = highlightEmailVerify ? ripples.badge : '';
    const alertSeverity = verificationEmailSent.includes('Error') ? 'error' : 'success';
    const alertTitle = verificationEmailSent.includes('Error') ? 'Error' : 'Success';

    return (
        <>
            <DefaultSnackbar
                className={className}
                severity={alertSeverity}
                open={openSnackBar}
                handleClose={() => setOpenSnackBar(false)}
                title={alertTitle}
                info={verificationEmailSent}
            />
            <Stack direction={'row'}>
                <Hidden smDown>
                    <Box>
                        <SideBar />
                    </Box>
                </Hidden>

                <Box sx={{ mb: 10, margin: 'auto', mt: 10 }}>
                    <Box>
                        {!transactions?.length ? (
                            <>
                                {!loading && !emailVerified && (
                                    <Box
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            marginRight: 10,
                                            marginLeft: 10,
                                            maxWidth: 900,
                                            margin: 'auto',
                                            borderRadius: 3,
                                            flexWrap: 'wrap',
                                            padding: 10,
                                            border: '1px solid ',
                                            cursor: 'pointer',
                                            width: '90vw',
                                            marginTop: '2vh',
                                            background: '#FFEBE9'
                                        }}
                                        onClick={handleSendVerificationEmail}
                                    >
                                        <Box fontWeight={500}>{emailLink}</Box>
                                    </Box>
                                )}
                                <EmptyCardContainer setHighlightEmailVerify={setHighlightEmailVerify} />
                                <UserNavBar />
                            </>
                        ) : (
                            <div>
                                <Typography className={classes.heading}>Your Transactions</Typography>
                                <div className={classes.dashboard_container}>
                                    {!error &&
                                        transactions?.length &&
                                        transactions?.map((transaction: any) => <CardContainer transactionData={transaction} key={transaction.id} />)}
                                    <SpeedDialTooltip
                                        handleOpenSpeedDial={handleOpenSpeedDial}
                                        handleSpeedDialClose={handleSpeedDialClose}
                                        openSpeedDial={openSpeedDial}
                                        hidden={hidden}
                                        handleSpeedDialVisibility={handleSpeedDialVisibility}
                                    />
                                </div>
                                <UserNavBar />
                            </div>
                        )}
                    </Box>
                </Box>
            </Stack>
        </>
    );
}
