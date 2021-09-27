import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Button, Card, CardContent, CardActions, Typography } from '@material-ui/core'

import { Link } from 'react-router-dom';


import { CalendarSvgComponent } from 'components/icons/calendar';




interface ServiceCardProps {
    price: number
    paragraph?: string
    heading: string
}


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            borderRadius: 12,
            boxShadow: 'rgba(0, 27, 71, 0.16) 0px 29px 32px -25px',
        },
        cardAction: {
            marginTop: 10,
            marginBottom: 30,
            display: 'flex',
            justifyContent: 'center'
        },
        mainButton: {
            textTransform: 'none',
            minWidth: 150,
            boxShadow: 'none',
            margin: theme.spacing(1),
            background: `${theme.colors.base}`,
        },
        heading: {
            fontWeight: 700,
            color: '#0d324d',
            padding: '20px 0px',
            textAlign: 'center',
            fontSize: '1.2rem',
            fontFamily: 'Nunito',
        },

        paragraph: {
            fontWeight: 400,
            fontSize: '0.9rem',
            color: '#999999',
            textAlign: 'center'

        },
        description: {
            fontSize: '0.9rem',
        },

    }),
);


export function PriceCard({ price, heading, paragraph }: ServiceCardProps) {
    const classes = useStyles();



    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography color="textSecondary" className={classes.heading}>
                    {heading}
                </Typography>
                <Typography component="p" className={classes.paragraph}>
                    {price}
                </Typography>
                <Typography component="p" className={classes.paragraph}>
                    Our advisors will guide you through your options.
                    Helping you to understand.
              </Typography>
            </CardContent>
            <CardActions className={classes.cardAction}>
                <Button endIcon={<CalendarSvgComponent />} className={classes.mainButton} color={'primary'} variant={'contained'} size={'medium'}> {'Book Now'}</Button>
            </CardActions>
        </Card >
    );
}
