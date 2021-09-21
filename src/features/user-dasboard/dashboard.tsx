import { Typography } from '@material-ui/core';

import UserNavBar from './bottom-navbar'
import { CardContainer } from './card-container';
import { useState, useEffect } from 'react';


import { useDashboardStyles } from './classes'
import { DashboardLoaderSkeleton } from './loader-skeleton'
import { EmptyCardContainer } from './empty-service';

// queries and co
import { useGetUserTransactionsQuery } from 'api/generated/graphql'
import { useFirebaseAuthContext } from 'providers/auth/firebase';

import DesktopNabBar from './nav';
import { SpeedDialTooltip } from 'components/speed-dial';





export default function Dashboard() {
    const { authState: { user } } = useFirebaseAuthContext()
    const id = user!.uid ?? ''

    const { data: transactionData, error, loading } = useGetUserTransactionsQuery({ variables: { id } })
    const transactions = transactionData?.transaction

    const [openSpeedDial, setopenSpeedDial] = useState(false);
    const [hidden, setHidden] = useState(false);

    const handleSpeedDialVisibility = () => {
        setHidden((prevHidden) => !prevHidden);
    };

    const handleOpenSpeedDial = () => {
        setopenSpeedDial(true);
    };

    const handleSpeedDialClose = () => {
        setopenSpeedDial(false);
    };



    const classes = useDashboardStyles()


    return (
        <>
            <DesktopNabBar />
            {!loading && !transactions?.length ?
                <>
                    <EmptyCardContainer />
                    <UserNavBar />
                </> :
                <div>
                    {loading ?
                        <div>
                            <Typography className={classes.heading}>Your Transactions</Typography>
                            <DashboardLoaderSkeleton />
                        </div>
                        :
                        <div>
                            <Typography className={classes.heading}>Your Transactions</Typography>
                            <div className={classes.dashboard_container}>
                                {!error && transactions?.length && transactions?.map((transaction: any) => <CardContainer transactionData={transaction} key={transaction.id} />)}
                                <SpeedDialTooltip handleOpenSpeedDial={handleOpenSpeedDial} handleSpeedDialClose={handleSpeedDialClose} openSpeedDial={openSpeedDial} hidden={hidden} handleSpeedDialVisibility={handleSpeedDialVisibility} />
                            </div>
                            <UserNavBar />
                        </div>
                    }
                </div>
            }
        </>

    )
}
