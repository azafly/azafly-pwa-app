import { Card, CardContent, Chip, Collapse, Typography } from '@material-ui/core';
import { format } from 'date-fns';
import { useCardStyles } from './classes';
import React, { memo } from 'react';

import { dashboard as data } from 'mocks/dashboard';
import { formatCurrency } from 'utils';
import { InfoText } from './info-text';
import { ProgressStatusSteppers } from './status-stepper';
// import TaskList from './task-list';

interface CardProps {
    transactionData: any;
}

export const CardContainer = memo(function CardContainer({ transactionData }: CardProps) {
    const [expanded, setExpanded] = React.useState(!transactionData.is_success_done);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const { amount, created_at, is_success_done, name } = transactionData;

    const date = `${format(new Date(created_at), 'dd, MMMM yyyy')}`;
    const classes = useCardStyles();
    const formattedAmount = formatCurrency({ currency: 'EUR', amount, countryCode: 'DE' });
    return (
        <Card className={classes.dashboardCard__root} onClick={handleExpandClick}>
            <CardContent>
                <div className={classes.starter}>
                    <div className={classes.serviceName}>
                        <h1 className='name'>{formattedAmount} </h1>
                        <Typography className='date' paragraph color='secondary' style={{ fontWeight: 800 }}>
                            Reference: {name}
                        </Typography>
                        <Typography className='date' paragraph color='secondary'>
                            {date}
                        </Typography>
                    </div>
                    <Chip className={classes.serviceInitiated} label={is_success_done ? 'Completed' : 'In Progress'} />
                </div>
                <InfoText text={data.infoText} />
                <div className={classes.divider} />
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
