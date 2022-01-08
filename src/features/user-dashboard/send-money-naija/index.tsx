import { Box, Card, CardContent, Chip, Collapse, Typography } from '@material-ui/core';
import { format } from 'date-fns';
import { useCardStyles } from '.././classes';
import React, { memo } from 'react';

import { dashboard as data } from 'mocks/dashboard';
import { formatCurrency } from 'libs';
import { InfoText } from '.././info-text';
import { ProgressStatusSteppers } from '.././status-stepper';
// import TaskList from './task-list';

interface CardProps {
    transactionData: any;
}

export const SendFromNaija = memo(function CardContainer({ transactionData }: CardProps) {
    const [expanded, setExpanded] = React.useState(!transactionData.is_success_done);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const {
        created_at,
        is_success_done,
        payment_offer: { source_currency: currency, source_amount: amount }
    } = transactionData;

    const date = `${format(new Date(created_at), 'dd, MMMM yyyy')}`;
    const classes = useCardStyles();
    const formattedAmount = formatCurrency({ currency, amount, countryCode: 'DE' });
    return (
        <Card elevation={0} className={classes.dashboardCard__root}>
            <CardContent>
                <div className={classes.starter}>
                    <div className={classes.serviceName}>
                        <h1 className='name'>{formattedAmount} </h1>
                        <Typography className='date' paragraph color='secondary' style={{ fontWeight: 800 }}>
                            {/* TODO: UPDATE WHEN DETAILS CHANGES IN SERVER */}
                            {/* {name} */}
                            Reference: Birmingham School Fees
                        </Typography>
                        <Typography className='date' paragraph color='secondary'>
                            {date}
                        </Typography>
                    </div>
                    <Chip className={classes.serviceInitiated} label={is_success_done ? 'Success' : 'In Progress'} />
                </div>
                <Box onClick={handleExpandClick}>
                    <InfoText text={data.infoText} />
                </Box>
                <Collapse in={expanded} timeout='auto' unmountOnExit>
                    <Typography variant='h6' color='textSecondary' align={'center'} className={classes.summary_heading}>
                        Your progress summary
                    </Typography>
                    <ProgressStatusSteppers />
                    {/* <TaskList taskList={tasks} /> */}
                </Collapse>
            </CardContent>
        </Card>
    );
});
