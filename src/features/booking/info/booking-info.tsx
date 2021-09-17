import { Paper, Grid, Card, Typography, CardContent, CardMedia, Avatar } from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';

import { useBookingInfoStyles, StyledBadge } from '../classes'

// methods
import { useFirebaseAuthContext } from 'providers/auth/firebase'






export const BookingInfo = () => {
    const { authState: { user } } = useFirebaseAuthContext()



    const classes = useBookingInfoStyles()
    return (
        <Grid item xs={12} lg={4} className={classes.booking_info_container}>
            <Card variant="outlined">
                <CardContent>
                    <CardMedia>
                        <StyledBadge
                            overlap="circular"
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            variant="dot"
                        >
                            <Avatar className={classes.large} alt="consultant" src="https://images.pexels.com/photos/718978/pexels-photo-718978.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" />
                            
                        </StyledBadge>
                        <span> <span className={classes.tip}>
                            &nbsp; Your Advisor :
                    </span>
                            <span className={classes.advisor}> &nbsp; {'Jennifer Amkam'}</span></span>

                    </CardMedia>
                    <Typography className={classes.title} color="textSecondary" gutterBottom variant="h5">
                        {user?.displayName} & Azafly
                    </Typography>
                    <Typography className={classes.time} color="textSecondary" gutterBottom >
                        <AccessTimeIcon />&nbsp; 30 minutes
                    </Typography>
                    <br />
                    <Typography color="primary" className={classes.infoText} gutterBottom  >
                        Hey  {user?.displayName} . Here is your chance to have a free no-string attached consulation with Azafly.
                        Our expereinced counstants will give you the best advices. Select a time on the calendar.
                    </Typography>
                    <Typography className={classes.tip}>
                        Tip: available dates are highlighted in green
                    </Typography>
                </CardContent>

            </Card>
        </Grid>

    )
}
