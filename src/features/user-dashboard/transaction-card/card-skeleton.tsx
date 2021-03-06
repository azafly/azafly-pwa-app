import { Card, CardContent } from '@material-ui/core';
import Skeleton from 'react-loading-skeleton';

import { useCardStyles } from '../classes';

export const CardSkeleton = () => {
    const classes = useCardStyles();
    return (
        <Card elevation={0} className={classes.dashboardCard__root}>
            <CardContent>
                <div className={classes.starter}>
                    <div className={classes.serviceName} style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                        <Skeleton width={'20ch'} />
                        <Skeleton width={'10ch'} />
                    </div>
                </div>
                <Skeleton width={'20%'} style={{ marginBottom: 20 }} />
                <Skeleton width={'40%'} />
            </CardContent>
        </Card>
    );
};
