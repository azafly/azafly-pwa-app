import { Box, Typography } from '@material-ui/core';
import { useState } from 'react';
import ErrorIcon from '@mui/icons-material/Error';

import { CardContainer } from './card-container';
import { DashboardLoaderSkeleton } from './loader-skeleton';
import { EmptyCardContainer } from './empty-service';
import { NavBar } from './nav-bar';
import { DefaultSnackbar, SpeedDialTooltip } from 'components';
import { useDashboardStyles } from './classes';
import UserNavBar from './bottom-navbar';

// queries and co
import { useGetUserTransactionsQuery } from 'api/generated/graphql';
import { useFirebaseAuthContext } from 'providers/auth/firebase';
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

    const id = user?.uid ?? '';

    const emailVerified = user?.emailVerified;

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
            <ErrorIcon />
            {'You need to verify your email to make payments. Click here to get a new Verification Email'}
        </>
    );
    const className = highlightEmailVerify ? classes.animate : '';
    const alertSeverity = verificationEmailSent.includes('Error') ? 'error' : 'success';
    const alertTitle = verificationEmailSent.includes('Error') ? 'Error' : 'Success';

    if (loading) {
        return (
            <div>
                <NavBar />
                <Typography className={classes.heading}>My Transactions</Typography>
                <DashboardLoaderSkeleton />
            </div>
        );
    }

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
            <NavBar />
            <Box sx={{ mt: 15 }}>
                {!transactions?.length ? (
                    <>
                        {!emailVerified && (
                            <Box
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    marginRight: 10,
                                    marginLeft: 10,
                                    maxWidth: '80vw',
                                    margin: 'auto',
                                    borderRadius: 3,
                                    flexWrap: 'wrap',
                                    padding: 10,
                                    border: '1px solid ',
                                    cursor: 'pointer',
                                    background: '#FFEBE9'
                                }}
                                className={className}
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
        </>
    );
}
