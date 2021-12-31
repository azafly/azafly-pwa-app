import { Box, Typography, useMediaQuery } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core';
import { FilterTab } from '../filter-tab-heading';
import { memo, ReactNode, useCallback, useState } from 'react';
import DateRangeIcon from '@mui/icons-material/DateRange';
import DateRangePicker, { DateRange } from '@mui/lab/DateRangePicker';
import MobileDateRangePicker from '@mui/lab/MobileDateRangePicker';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

import { CardContainer } from './card-container';
import { CardSkeleton } from './card-skeleton';
import { EmptyCardContainer } from '../empty-transaction/card';
import { EmptyDataSvgComponent } from 'components';
import { PendingOfferCardContainer } from '../pending-offer/index';
import { useGetUserPendingOffersQuery, useFilterTransactionsByDateRangeLazyQuery } from 'api/generated/graphql';
import { useUserContext } from 'hooks/use-user-context';

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
            maxWidth: 900,

            '& input': {
                fontSize: '0.65rem',
                fontFamily: 'Nunito',
                fontWeight: 600
            },
            '& label': {
                fontSize: '0.65rem',
                fontFamily: 'Nunito',
                fontWeight: 600
            }
        },
        picker_card: {
            display: 'flex',
            justifyContent: 'center',
            margin: 'auto',
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

    const { user: userData } = useUserContext();
    const id = userData?.id;

    const handleDateRangeSelect = useCallback(
        (startEnd: any) => {
            const [startDate, endDate] = startEnd;
            const start_date = startDate.toUTCString();
            const end_date = endDate.toUTCString();
            filterTransactionByDate({ variables: { id, start_date, end_date } });
            setOpenDatePicker(false);
        },
        [filterTransactionByDate, id]
    );

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
        <Stack justifyContent={'center'} sx={{ maxWidth: 900, margin: 'auto' }}>
            {' '}
            <Paper sx={{ p: 8, pt: 0, boxShadow: '0 2px 16px 0 rgba(0,0,0,0.08)' }}>
                <Stack justifyContent={'center'} width={'100%'} alignItems={'center'} mt={4}>
                    <Typography gutterBottom style={{ marginBottom: 20 }}>
                        {' '}
                        You have no pending offers
                    </Typography>
                    <EmptyDataSvgComponent />
                </Stack>
            </Paper>
        </Stack>
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
                <Paper className={classes.picker_card} sx={{ boxShadow: '0 2px 16px 0 rgba(0,0,0,0.08)' }}>
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
                </Paper>

                {filteredTransactions?.transaction?.map((transaction: any) => (
                    <CardContainer transactionData={transaction} key={transaction.id} />
                ))}

                {filteredTransactions?.transaction && !filteredTransactions?.transaction.length && (
                    <Stack justifyContent={'center'} sx={{ maxWidth: 900, margin: 'auto' }}>
                        {' '}
                        <Paper sx={{ p: 8, pt: 0, boxShadow: '0 2px 16px 0 rgba(0,0,0,0.08)' }}>
                            <Stack justifyContent={'center'} width={'100%'} alignItems={'center'} mt={4}>
                                <Typography gutterBottom style={{ marginBottom: 20 }}>
                                    {' '}
                                    You have no transactions during this time period
                                </Typography>
                                <EmptyDataSvgComponent />
                            </Stack>
                        </Paper>
                    </Stack>
                )}
            </>
        );
    };

    const heading = (text: string, icon?: any) => (
        <div style={{ display: 'flex', alignItems: 'center', margin: 'auto' }} key={text}>
            {' '}
            {icon}
            <Typography style={{ textTransform: 'capitalize', fontWeight: 600, fontSize: '0.95em', color: '#0d324d' }}> {text}</Typography>
        </div>
    );
    return (
        <>
            <FilterTab
                tabViews={[
                    {
                        heading: heading('Transactions'),
                        component: allOffers
                    },
                    {
                        heading: heading('Pending Offers'),
                        component: pendingTransactions
                    },
                    {
                        heading: heading('', <DateRangeIcon />),
                        component: transactionsByDate(),
                        headingClickHandler: setOpenDatePicker
                    }
                ]}
                handleSetDateValue={setDateValue}
                dateValue={dateValue}
                openDatePicker={openDatePicker}
            />
        </>
    );
});
