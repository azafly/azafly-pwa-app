import { Grid } from '@material-ui/core'
import { useCardContainerStyle } from '../classes'


import { Cards } from './card';

export const CardsContainer = () => {
    const classes = useCardContainerStyle()
    return (

        <Grid container className={classes.cards} spacing={5} alignContent="center">
            {[1, 2, 3].map(card => <Cards />)}
        </Grid>
    )
}
