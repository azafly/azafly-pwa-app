import { Grid, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import Skeleton from 'react-loading-skeleton';

import { CardSkeleton } from './card-skeleton';
import { formatFirstName } from 'libs';
import { useGetUserTransactionsQuery } from 'api/generated/graphql';
import { NewTransactionContainer } from '../currency-conversion/new-transaction-container';
import { RootState } from 'app/store';

import { TransactionListContainer } from './transaction-list-container';
import WalletContainer from '../wallet/wallet-container';

import { useDashboardStyles } from '../classes';
import { TOUR_DASHBOARD_LOCAL } from '../product-tours';
import { EmptyCardContainer } from '../empty-transaction/card';
import { CardContainer } from './card-container';

export const Transactions = () => {
    const classes = useDashboardStyles();

    const {
        auth: { hasuraUser }
    } = useSelector(({ auth }: RootState) => ({ auth }));
    const userData = hasuraUser ?? {};

    const { data: transactionData, loading } = useGetUserTransactionsQuery({ variables: { id: userData.id } });
    debugger;
    const transactions = transactionData?.transaction;

    const all = transactions?.map((transaction: any) => <CardContainer transactionData={transaction} key={transaction.id} />);
    const allOffers = transactions?.length ? all : <EmptyCardContainer loading={loading} />;

    return (
        <Grid item md={10} className={classes.data__section}>
            <Typography color={'textSecondary'} className={classes.name} gutterBottom>
                <span className={`${TOUR_DASHBOARD_LOCAL.START_TOUR}`} /> Hey 👋🏾{' '}
                {!userData?.display_name ? <Skeleton width={'10ch'} /> : `${formatFirstName(userData?.display_name)}!`}{' '}
            </Typography>{' '}
            {/* // TOD remove manual toggle */}
            {true ? <NewTransactionContainer /> : <WalletContainer />}
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
                    <TransactionListContainer allOffers={allOffers ?? null} loading={loading} />{' '}
                </>
            )}
        </Grid>
    );
};
