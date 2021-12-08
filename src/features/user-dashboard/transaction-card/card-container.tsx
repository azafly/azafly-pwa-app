import { Card, CardContent, Chip, Collapse, Typography } from '@material-ui/core';
import { format } from 'date-fns';
import React, { memo } from 'react';

import { dashboard as data } from 'mocks/dashboard';
import { formatCurrency } from 'libs';
import { InfoText } from '../info-text';
import { ProgressStatusSteppers } from '../status-stepper';

import { useCardStyles } from '../classes';

interface CardProps {
    transactionData: any;
}

export const CardContainer = memo(function CardContainer({ transactionData }: CardProps) {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const {
        created_at,
        is_success_done,
        payment_offer: { source_currency: currency, source_amount: amount, payment_status }
    } = transactionData;

    const date = `${format(new Date(created_at), 'dd, MMMM yyyy')}`;
    const classes = useCardStyles();
    const formattedAmount = formatCurrency({ currency, amount, countryCode: 'DE' });
    return (
        <Card elevation={1} className={classes.dashboardCard__root} onClick={handleExpandClick}>
            <CardContent>
                <div className={classes.starter}>
                    <div className={classes.serviceName}>
                        <h1 className='name'>{formattedAmount} </h1>

                        <Typography className='date' paragraph color='secondary' style={{ fontWeight: 600 }}>
                            {/* TODO: UPDATE WHEN DETAILS CHANGES IN SERVER */}
                            {/* {name} */}
                            Reference: Birmingham School Fees
                        </Typography>

                        <Typography className='date' paragraph color='secondary'>
                            {date}
                        </Typography>
                    </div>

                    {payment_status !== 'PENDING' && (
                        <Chip className={classes.serviceInitiated} label={is_success_done ? 'Completed' : 'In Progress'} />
                    )}
                    {payment_status === 'PENDING' && <Chip className={classes.serviceInitiated} label={'Pending'} />}
                </div>

                <InfoText text={data.infoText} />

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
