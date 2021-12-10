import { Grid, Hidden } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import ErrorIcon from '@mui/icons-material/Error';

import { DefaultSnackbar, SpeedDialTooltip } from 'components';
import { fetchWallet } from './mock';
import { RootState } from 'app/store';
import { SideBar } from './side-bar';
import { UserAccount } from 'views/user-account';
import { ThreeDots } from 'components/css-loaders/three-dots/three-dots';
import { Transactions as TransactionView } from './transactions';
import { useGetUserTransactionsQuery } from 'api/generated/graphql';
import { useUserContext } from 'hooks/use-user-context';
import CardList from './virtual-cards/card-list';
import Payments from 'views/payments';

import { useDashboardStyles, StyledBadge } from './classes';

export default function Dashboard() {
    const [hidden, setHidden] = useState(false);
    const [isSendingLink, setLoading] = useState(false);
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [openSpeedDial, setOpenSpeedDial] = useState(false);
    const [verificationEmailSent, setSent] = useState('');

    const { user } = useSelector((rootState: RootState) => rootState.auth);
    const { currentSideBarTab } = useSelector((rootState: RootState) => rootState.dashboard);
    const userData = useUserContext();

    const id = userData?.id;

    const { data: transactionData, loading } = useGetUserTransactionsQuery({ variables: { id } });
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
        <ThreeDots styles={{ background: 'green' }} />
    ) : (
        <div>
            <ErrorIcon className={ripples.badge} style={{ width: 20, height: 20 }} />
            <span style={{ fontWeight: 500 }}> {' You need to verify your email to make payments. Click here to get a new Verification Email'} </span>
        </div>
    );

    const alertSeverity = verificationEmailSent.includes('Error') ? 'error' : 'success';
    const alertTitle = verificationEmailSent.includes('Error') ? 'Error' : 'Success';

    useEffect(() => {
        fetchWallet();
    }, []);

    if (userData?.is_new_user) {
        return (
            <Redirect
                to={{
                    pathname: '/onboarding-update',
                    state: { referrer: '/dashboard' }
                }}
            />
        );
    }
    return (
        <div className={classes.dashboard_container}>
            <DefaultSnackbar
                severity={alertSeverity}
                open={openSnackBar}
                handleClose={() => setOpenSnackBar(false)}
                title={alertTitle}
                autoHideDuration={10000}
                info={verificationEmailSent}
            />
            <Grid container>
                <Hidden mdDown>
                    <Grid item md={2}>
                        <SideBar />
                    </Grid>
                </Hidden>

                {(currentSideBarTab === 'transactions' || currentSideBarTab === 'dashboard') && (
                    <TransactionView
                        loading={loading}
                        emailLink={emailLink}
                        transactionData={transactionData}
                        handleSendVerificationEmail={handleSendVerificationEmail}
                        transactions={transactions}
                        userData={userData}
                    />
                )}
                {currentSideBarTab === 'cards' && <CardList />}
                {currentSideBarTab === 'account' && <UserAccount />}
            </Grid>

            <SpeedDialTooltip
                handleOpenSpeedDial={handleOpenSpeedDial}
                handleSpeedDialClose={handleSpeedDialClose}
                openSpeedDial={openSpeedDial}
                hidden={hidden}
                handleSpeedDialVisibility={handleSpeedDialVisibility}
            />
        </div>
    );
}
