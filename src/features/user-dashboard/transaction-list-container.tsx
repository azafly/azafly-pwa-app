import { Box, Typography, useMediaQuery } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core';
import { memo, ReactNode, useState } from 'react';
import { TransactionFilterTab } from './filter/tab';
import DateRangePicker, { DateRange } from '@mui/lab/DateRangePicker';
import MobileDateRangePicker from '@mui/lab/MobileDateRangePicker';
import TextField from '@mui/material/TextField';

import { CardContainer, CardSkeleton } from './transaction-card';
import { EmptyCardContainer } from './empty-transaction/card';
import { PendingOfferCardContainer } from './pending-offer/index';
import { useFirebaseAuthContext } from 'providers/auth/firebase';
import { useGetUserPendingOffersQuery, useGetCurrentUserByEmailQuery, useFilterTransactionsByDateRangeLazyQuery } from 'api/generated/graphql';

interface TransactionListContainerProps {
    transactions: readonly any[];
    classes?: Record<string, string>;
    emailLink: ReactNode;
    loading: boolean;
    handleSendVerificationEmail: () => void;
}

export const useStyles = makeStyles(() =>
    createStyles({
        datePicker__container: {
            margin: 'auto',
            marginTop: 20,
            marginBottom: 20,
            display: 'flex',
            maxWidth: 900
        },
        datePicker__mobile: {
            display: 'flex',
            margin: 'auto',
            justifyContent: 'center',
            marginTop: 20,
            marginBottom: 20,
            maxWidth: 900
        }
    })
);
export const TransactionListContainer = memo(function TransactionListContainer({
    transactions,
    emailLink,
    loading,
    handleSendVerificationEmail
}: TransactionListContainerProps) {
    const [dateValue, setDateValue] = useState<DateRange<Date>>([null, null]);
    const [openDatePicker, setOpenDatePicker] = useState(false);
    const [filterTransactionByDate, { data: filteredTransactions, loading: isLoadingFilter }] = useFilterTransactionsByDateRangeLazyQuery();
    const classes = useStyles();

    const {
        authState: { user }
    } = useFirebaseAuthContext();

    const { data: userData } = useGetCurrentUserByEmailQuery({
        variables: {
            email: user?.email ?? ''
        }
    });

    const handleDateRangeSelect = async (startEnd: any) => {
        const [startDate, endDate] = startEnd;

        const id = userData?.users[0]?.id ?? '',
            start_date = startDate.toUTCString(),
            end_date = endDate.toUTCString();
        filterTransactionByDate({ variables: { id, start_date, end_date } });
        setOpenDatePicker(false);
    };

    const id = userData?.users[0]?.id;
    const { data: offerData } = useGetUserPendingOffersQuery({ variables: { id } });

    const isMobile = useMediaQuery('(max-width:960px)');

    const all = transactions?.map((transaction: any) => <CardContainer transactionData={transaction} key={transaction.id} />);
    const pending = offerData?.payment_offer?.map((transaction: any) => (
        <PendingOfferCardContainer transactionData={transaction} key={transaction.id} />
    ));
    const allOffers = transactions.length ? (
        all
    ) : (
        <EmptyCardContainer emailLink={emailLink} handleSendVerificationEmail={handleSendVerificationEmail} loading={loading} />
    );

    const pendingTransactions = pending?.length ? (
        pending
    ) : (
        <Typography align={'center'} style={{ maxWidth: 900, margin: 'auto' }}>
            {' '}
            You have no pending transactions
        </Typography>
    );

    const transactionsByDate = () => {
        if (isLoadingFilter) {
            return Array(4)
                .fill('')
                .map((_, index) => <CardSkeleton key={index} />);
        }
        return (
            <>
                <Typography align={'center'} style={{ maxWidth: 900, margin: 'auto', marginTop: 20, fontWeight: 600 }}>
                    Filter your transactions by date range
                </Typography>
                {isMobile ? (
                    <MobileDateRangePicker
                        startText='Starting Date'
                        endText='End Date'
                        value={dateValue}
                        maxDate={new Date()}
                        onChange={(newValue: any) => {
                            setDateValue(newValue);
                        }}
                        onAccept={date => {
                            console.log(date);
                            handleDateRangeSelect(date);
                        }}
                        renderInput={(startProps, endProps) => (
                            <div className={classes.datePicker__mobile}>
                                <TextField {...startProps} variant='standard' />
                                <Box sx={{ mx: 2 }}> </Box>
                                <TextField {...endProps} variant='standard' />
                            </div>
                        )}
                    />
                ) : (
                    <DateRangePicker
                        startText='Starting Date'
                        endText='End Date'
                        value={dateValue}
                        maxDate={new Date()}
                        onChange={(newValue: any) => {
                            setDateValue(newValue);
                        }}
                        onAccept={date => handleDateRangeSelect(date)}
                        renderInput={(startProps, endProps) => (
                            <div className={classes.datePicker__container}>
                                <TextField {...startProps} variant='standard' />
                                <Box sx={{ mx: 2 }}> </Box>
                                <TextField {...endProps} variant='standard' />
                            </div>
                        )}
                    />
                )}

                {filteredTransactions?.transaction?.map((transaction: any) => (
                    <CardContainer transactionData={transaction} key={transaction.id} />
                ))}

                {filteredTransactions?.transaction && !filteredTransactions?.transaction.length && (
                    <Typography align={'center'} style={{ maxWidth: 900, margin: 'auto' }}>
                        {' '}
                        You have no transactions during this time period
                    </Typography>
                )}
            </>
        );
    };

    return (
        <TransactionFilterTab
            tabViews={[allOffers, pendingTransactions, transactionsByDate()]}
            handleSetDateValue={setDateValue}
            dateValue={dateValue}
            openDatePicker={openDatePicker}
            setOpenDatePicker={setOpenDatePicker}
        />
    );
});
