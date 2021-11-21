import { Card, CardContent, Typography } from '@material-ui/core';
import { Chip } from '@mui/material';
import { format } from 'date-fns';
import React, { memo } from 'react';

import { formatCurrency } from 'libs';
import { InfoText } from '../info-text';

import { useCardStyles } from '../classes';

interface CardProps {
    transactionData: any;
}

export const PendingOfferCardContainer = memo(function CardContainer({ transactionData }: CardProps) {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const { created_at, source_currency: currency, source_amount: amount } = transactionData;

    const date = `${format(new Date(created_at), 'dd, MMMM yyyy')}`;
    const classes = useCardStyles();
    const formattedAmount = formatCurrency({ currency, amount, countryCode: 'DE' });
    return (
        <Card elevation={0} className={classes.dashboardCard__root} onClick={handleExpandClick}>
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

                    <Chip className={classes.serviceInitiated} label={'Pending'} color={'warning'} />
                </div>

                <InfoText text={'Click to continue Payment'} />
            </CardContent>
        </Card>
    );
});
