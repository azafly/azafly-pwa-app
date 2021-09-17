import { useEmptyCardStyles } from './classes';
import { Button, Card, CardActions, CardMedia } from '@material-ui/core'


import { EmptyServiceSvgComponent } from 'components/illustrations';
import { Link } from 'react-router-dom';





export const EmptyCardContainer = () => {

    const classes = useEmptyCardStyles()

    return (
        <Card className={classes.empty_card_root}>
            <h1 className={classes.nothing}>{`You don't have any transaction yet`} </h1>
            <CardMedia>
                <EmptyServiceSvgComponent />
            </CardMedia>
            <CardActions>
                {/*TODO:  Sould go to services */}

                <Link to="/booking" className={classes.button} style={{ textDecoration: 'none' }}>
                    <Button className={classes.button} color={'primary'} variant={'contained'} size={'medium'}>{'Consult for Free'}</Button>
                </Link>
                <Link to="/payment" className={classes.button} style={{ textDecoration: 'none' }}>
                    <Button className={classes.button} color={'primary'} variant={'outlined'} size={'medium'}>{'Make Payments'}</Button>
                </Link>
            </CardActions>
        </Card>
    )
}
