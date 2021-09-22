//@ts-ignore
import { Grid, Typography } from '@material-ui/core';
import { motion, AnimateSharedLayout } from "framer-motion"
import { format } from 'date-fns'
import { useState, forwardRef } from 'react'

import { DayAvailableTime } from './day-available-time'
import { useDaysTimeContainerStyles } from './classes'
import { ConfrimationDialog } from './confirm-modal';

interface AvailableTimesProps {
    availableTimesArray: any
}



export const AvailableTimes = forwardRef((props: AvailableTimesProps, ref: any) => {
    const { availableTimesArray } = props

    const classes = useDaysTimeContainerStyles()

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const time = availableTimesArray?.length && `${format(new Date(availableTimesArray[0]?.start), 'EEEE,  dd MMMM yyyy HH:mm')}`
    const event = availableTimesArray && availableTimesArray[0]

    return (
        <>
            <ConfrimationDialog handleClose={handleClose} open={open} appointmentDateAndTime={time} event={event} />
            <Grid
                ref={ref}
                component={motion.div}
                item xs={12} md={4}
                container
                layout
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -100, opacity: 0 }}
                transition={{
                    delay: 0.8,
                    x: { type: "spring", stiffness: 10 },
                    default: { duration: 0.7 },
                    staggerDirection: -1

                }}

            >
                <AnimateSharedLayout>
                    <div className={classes.days_time_container}>
                        {!availableTimesArray?.length &&
                            <>
                                <Typography className={classes.notavailable} color="secondary" variant="h6">{'Sorry, No time slot available today.'}</Typography>
                                <Typography className={classes.notavailable} color="secondary" variant="h6">{'Kindly, Try another date.'}</Typography>
                                <Typography className={classes.tip}>
                                    Tip: available dates are highlighted in green
                    </Typography>
                            </>
                        }
                        {!!availableTimesArray?.length &&
                            <Typography gutterBottom className={classes.available} color="secondary" variant="h6">{format(new Date(availableTimesArray[0]?.start), 'EEEE,  dd MMMM yyyy')}</Typography>}
                        {availableTimesArray?.map((availability: any) => <DayAvailableTime key={`${availability.start}`} availableTimes={availability} onClickOpen={handleClickOpen} />)}
                    </div>

                </AnimateSharedLayout >
            </Grid>
        </>
    )
})
