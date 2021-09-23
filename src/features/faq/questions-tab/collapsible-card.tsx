import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Button, lighten } from '@material-ui/core';

interface CardProps {
    title: string
    content: string
}


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            margin: 'auto',
            alignSelf: 'start',
            boxShadow: '0 2px 16px 0 rgba(0, 0, 0, .08)',
            borderRadius: 12,

        },
        media: {
            margin: 'auto',
            paddingTop: 50,
            width: '100%',
            display: 'flex'
        },
        expand: {
            transform: 'rotate(0deg)',
            marginLeft: 'auto',
            transition: theme.transitions.create('transform', {
                duration: theme.transitions.duration.shortest,
            }),
        },
        expandOpen: {
            transform: 'rotate(180deg)',
        },
        cardAction: {
            marginTop: 10,
            marginBottom: 30,
            display: 'flex',
            justifyContent: 'center'

        },
        mainButton: {
            textTransform: 'none',
            width: 150,
            boxShadow: 'none',
            background: lighten(`${theme.colors.base}`, 0.2),
        },
        learnMore: {
            fontWeight: 400,
            fontSize: '0.8rem',
            color: theme.colors.base,
            textTransform: 'none',
            textAlign: 'center',
            marginTop: 10,
            cursor: 'pointer'


        },
        heading: {
            fontWeight: 900,
            color: '#333333',
            padding: '20px 0px',
            textAlign: 'center'
        },
        '& svg': {
            width: 150,
            margin: 'auto',
            height: 150
        },
        paragraph: {
            fontWeight: 400,
            fontSize: '0.8rem',
            color: '#999999',
            textAlign: 'center'

        },
        description: {
            fontSize: '0.8rem',
            letterSpacing: '0.4'
        },

    }),
);


export function FaqCollapisbleCard({ title, content }: CardProps) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography color="textSecondary" className={classes.heading}>
                    {title}
                </Typography>
                <Typography
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                    className={classes.learnMore}
                >
                    Learn more
                        <ExpandMoreIcon className={clsx(classes.expand, {
                    [classes.expandOpen]: expanded,
                })} />

                </Typography>
            </CardContent>



            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography className={classes.description} paragraph>
                        {content}
                    </Typography>
                </CardContent>
            </Collapse>
        </Card >
    );
}