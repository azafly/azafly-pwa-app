import React from 'react';
import { useCardStyles } from './classes';
import { Card, CardContent, Collapse, Typography } from '@material-ui/core';
import { format } from 'date-fns';

import { dashboard as data } from 'mocks/dashboard';
import { formatCurrency } from 'utils';
import { InfoText } from './info-text';
import { ProgressStatusSteppers } from './status-stepper';
import TaskList from './task-list';

interface CardProps {
    transactionData: any;
}

export const CardContainer = ({ transactionData }: CardProps) => {
    const [expanded, setExpanded] = React.useState(!transactionData.is_success_done);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const { amount, created_at, is_success_done, tasks, name, id } = transactionData;

    const date = `${format(new Date(created_at), 'dd, MMMM yyyy')}`;
    const classes = useCardStyles();
    const formattedAmount = formatCurrency({ currency: 'EUR', amount, countryCode: 'DE' });
    return (
        <Card className={classes.dashboardCardroot} onClick={handleExpandClick}>
            <CardContent>
                <div className={classes.starter}>
                    <div className={classes.serviceName}>
                        <h1 className='name'>{formattedAmount} </h1>
                        <Typography className='date' paragraph color='secondary'>
                            {date}
                        </Typography>
                    </div>
                    <div className={classes.serviceInitiated}>
                        <span>{is_success_done ? 'Completed' : 'In Progress'}</span>{' '}
                    </div>
                </div>
                <InfoText text={data.infoText} />
                <div className={classes.divider} />
                <Collapse in={expanded} timeout='auto' unmountOnExit>
                    <Typography variant='h6' color='textSecondary' align={'center'} className={classes.summary_heading}>
                        Your progress summary
                    </Typography>
                    <ProgressStatusSteppers />
                    <TaskList taskList={tasks} />
                </Collapse>
            </CardContent>
        </Card>
    );
};