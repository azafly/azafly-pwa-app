import { Box, Grid, Hidden } from '@material-ui/core';
import { Navigate } from 'react-router-dom';
import { sendEmailVerification } from 'firebase/auth';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import ErrorIcon from '@mui/icons-material/Error';

import { DefaultSnackbar, SpeedDialTooltip } from 'components';
import { Dispatch, RootState } from 'app/store';
import { fetchWallet } from './mock';
import { firebaseAuth } from 'providers/auth/firebase/firebase';
import { SideBar } from './side-bar';
import { ThreeDots } from 'components/css-loaders/three-dots/three-dots';
import { Tour } from 'components/product-tour/tour';
import { TOUR_DASHBOARD_LOCAL_STEPS } from './product-tours';
import { Transactions as TransactionView } from './transactions';
import { useGetExchangeRatesSubscription, useGetUserTransactionsQuery } from 'api/generated/graphql';
import { UserAccount } from 'views/user-account';

import { useDashboardStyles, StyledBadge } from './classes';
import { formatHasuraExchangeRates, ExchangeRates } from './utils';

export default function Dashboard() {
    const [hidden, setHidden] = useState(false);
    const [isSendingLink, setLoading] = useState(false);
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [openSpeedDial, setOpenSpeedDial] = useState(false);
    const [verificationEmailSent, setSent] = useState('');
    const [runTour, setRunTour] = useState(false);

    const dispatch = useDispatch<Dispatch>();

    const {
        dashboard: { currentSideBarTab },
        payments: { sellCurrency },
        auth
    } = useSelector(({ dashboard, auth, payments }: RootState) => ({ dashboard, auth, payments }));

    const { hasuraUser } = auth;
    const userData = hasuraUser ?? {};

    const { data: transactionData, loading } = useGetUserTransactionsQuery({ variables: { id: '8e12fca6-58a2-4ed9-836c-a11f3f51bffe' } });
    const { data: exchangeRates, error: errorRates, loading: loadingRates } = useGetExchangeRatesSubscription();
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
        const currentUser = firebaseAuth.currentUser;
        if (currentUser) {
            sendEmailVerification(currentUser)
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
        }
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

    // useEffect(() => {
    //     fetchWallet();
    //     dispatch.dashboard.setCurrentDashboardTab(currentSideBarTab ?? 'dashboard');
    // }, [dispatch.VIRTUAL_CARDS, dispatch.payments, dispatch.dashboard, currentSideBarTab]);

    // useEffect(() => {
    //     // set rates
    //     if (exchangeRates) {
    //         const rates = formatHasuraExchangeRates(sellCurrency, exchangeRates.exchange_rates as unknown as ExchangeRates[]);
    //         dispatch.payments.setRates(rates);
    //     }
    //     if (errorRates) {
    //         dispatch.dashboard.setFetchAPIState({
    //             loading: loadingRates,
    //             result: 'error',
    //             message: `${errorRates}`
    //         });
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [exchangeRates, errorRates, loadingRates]);

    useEffect(() => {
        dispatch.payments.setTotalToPayInSellCurrencyAsync(null);
        setRunTour(true);
    }, [dispatch.payments]);

    return (
        <div className={classes.dashboard_container}>
            {/* <Box sx={{ margin: 50 }} />
            <Tour steps={TOUR_DASHBOARD_LOCAL_STEPS} runTour={runTour} />
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
                {currentSideBarTab === 'account' && <UserAccount />}
                {currentSideBarTab === 'payment' && <Navigate to={'/payment'} />}
            </Grid>

            <SpeedDialTooltip
                handleOpenSpeedDial={handleOpenSpeedDial}
                handleSpeedDialClose={handleSpeedDialClose}
                openSpeedDial={openSpeedDial}
                hidden={hidden}
                handleSpeedDialVisibility={handleSpeedDialVisibility}
            /> */}
        </div>
    );
}
