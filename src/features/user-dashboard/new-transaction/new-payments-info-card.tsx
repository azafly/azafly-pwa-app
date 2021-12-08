import { Card, CardContent, Typography } from '@material-ui/core';
import { memo } from 'react';

import { dashboard as data } from 'mocks/dashboard';
import { InfoText } from '../info-text';

import { useCardStyles } from '../classes';

export const NewTransactionCardContainer = memo(function CardContainer() {
    const classes = useCardStyles();

    return (
        <Card elevation={0} className={classes.dashboardCard__root}>
            <CardContent>
                <div className={classes.starter}>
                    <div className={classes.serviceName}>
                        <h1 className='name'>{'Card'} </h1>

                        <Typography className='date' paragraph color='secondary' style={{ fontWeight: 600 }}>
                            {/* TODO: UPDATE WHEN DETAILS CHANGES IN SERVER */}
                            {/* {name} */}
                            Start New Tr
                        </Typography>
                    </div>
                </div>

                <InfoText text={data.infoText} />
            </CardContent>
        </Card>
    );
});
