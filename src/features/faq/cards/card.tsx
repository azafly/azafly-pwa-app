import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


import { useCardStyles } from '../classes';
import { Grid } from '@material-ui/core'

export function Cards() {
    const classes = useCardStyles();

    return (
        <Grid item xs={12} md={4}>
            <Card className={classes.root}>
                <CardActionArea className={classes.action} >
                    <CardMedia
                        className={classes.media}
                        image="https://www.ntb.de/wp-content/uploads/2019/11/placeholder-image-icon-21.jpg"
                        title="Contemplative Reptile"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2" align="center">
                            Lizard
          </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                            across all continents except Antarctica
          </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>

    );
}
