import { Box, Grid } from '@mui/material';
import { createStyles, makeStyles, Theme, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        typo: {
            fontWeight: 700,
            fontSize: '3rem',
            [theme.breakpoints.down('xs')]: {
                lineHeight: 0.5,
                margin: '10px',
                fontSize: '1.5rem'
            }
        }
    })
);

export const ConversionIcon = () => {
    const classes = useStyles();
    return (
        <Grid sx={{ width: 150, margin: 'auto' }} alignItems={'center'} alignSelf={'center'} alignContent={'center'}>
            <Box
                sx={{
                    // background: '#fafafa',
                    // borderRadius: '50%',
                    width: 100,
                    // boxShadow: '0 2px 16px 0 rgba(0, 0, 0, .08)',
                    // border: '1px solid #DCDCDC',
                    // height: 100,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: 'auto'
                }}
            >
                <Typography className={classes.typo}>{'='}</Typography>
            </Box>
        </Grid>
    );
};
