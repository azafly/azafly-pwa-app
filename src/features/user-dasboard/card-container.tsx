import { useCardStyles } from './classes';
import { Card, CardContent, Typography } from '@material-ui/core'
import { format } from 'date-fns';

import { dashboard as data } from 'mocks/dashboard';


import { InfoText } from './info-text';
import TaskList from './task-list';

import { ProgressStatusSteppers } from './status-stepper';

interface CardProps {
    transactionData: any
}

export const CardContainer = ({ transactionData }: CardProps) => {
    // Show something selse for no tranactions
    const { amount, created_at, is_success_done, tasks, name, id } = transactionData
    //TODO : SORT BY CREATED AT

    const date = `${format(new Date(created_at), 'EEEE,  dd MMMM yyyy. HH:mm')}`
    const classes = useCardStyles()
    return (
        <Card className={classes.dashboardCardroot}>
            <CardContent>
                <div className={classes.starter}>
                    <div className={classes.serviceName}>
                        <h1 className='name'>{name} </h1>
                        <Typography className='date' paragraph color="secondary">Started on {date}</Typography>
                    </div>
                    {is_success_done ? <div className={classes.serviceInitiated}><span>Completed</span> </div> : <div className={classes.serviceInitiated}> <span>Ongoing</span> </div>}
                </div>
                <InfoText text={data.infoText} />
                <div className={classes.divider} />
                <Typography variant="h6" color="textSecondary" align={"center"} className={classes.summary_heading}>Your progress summary</Typography>
                < ProgressStatusSteppers />
                <TaskList taskList={tasks} />
            </CardContent>
        </Card>
    )
}
