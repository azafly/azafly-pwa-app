import { formatFirstName } from 'libs';
import { Grid, Hidden, Slide, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import Skeleton from 'react-loading-skeleton';

import { CardSkeleton } from './card-skeleton';
import { GetUserTransactionsQuery } from 'api/generated/graphql';
import { NewTransactionContainer } from '../local-transaction-views/new-transaction-container';
import { RootState } from 'app/store';
import { TransactionListContainer } from './transaction-list-container';
import WalletContainer from '../wallet/wallet-container';

import { useDashboardStyles } from '../classes';

interface TransactionsViewProps {
    transactions: any;
    userData: any;
    loading: boolean;
    handleSendVerificationEmail: () => void;
    emailLink: JSX.Element;
    transactionData: GetUserTransactionsQuery | undefined;
}

export const Transactions = ({ transactions, userData, loading, handleSendVerificationEmail, transactionData, emailLink }: TransactionsViewProps) => {
    const classes = useDashboardStyles();
    const { viewState } = useSelector(({ dashboard }: RootState) => dashboard);
    return (
        <>
            <Slide direction='up' in mountOnEnter unmountOnExit appear timeout={800}>
                <Grid item md={10} className={classes.data__section}>
                    <Hidden xsDown>
                        <Typography color={'textSecondary'} className={classes.name}>
                            Hey 👋🏾 {!userData?.display_name ? <Skeleton width={'10ch'} /> : `${formatFirstName(userData?.display_name)}!`}
                        </Typography>{' '}
                    </Hidden>
                    {viewState === 'local' ? <NewTransactionContainer /> : <WalletContainer />}
                    <Typography className={'heading'}>Recent Activities</Typography>{' '}
                    {loading || !transactionData ? (
                        <>
                            {Array(5)
                                .fill('')
                                .map((_, index) => (
                                    <CardSkeleton key={index} />
                                ))}
                        </>
                    ) : (
                        <>
                            <TransactionListContainer
                                transactions={transactions ?? []}
                                emailLink={emailLink}
                                loading={loading}
                                handleSendVerificationEmail={handleSendVerificationEmail}
                            />
                        </>
                    )}
                </Grid>
            </Slide>
        </>
    );
};
