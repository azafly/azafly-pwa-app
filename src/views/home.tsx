import { HomeeCarousel } from '../components/home-carousel';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        homeConatiner: {
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            margin: 'auto',
            background: theme.palette.background.default,
            [theme.breakpoints.only('xs')]: {
                width: '100%',

            }
        }

    })
);


const Home = () => {
    const classes = useStyles()
    return (
        <div className={classes.homeConatiner}>
            <HomeeCarousel />
        </div>
    )
}

export default Home