
import { Grid } from '@material-ui/core'


import { useHeroStyle } from '../classes'
import { FAQSvg } from '../illustrations/faq';
import { SearchContainer } from '../search';

export const HeroContainer = () => {
    const classes = useHeroStyle()
    return (
        <div className={classes.hero__main}>
            <Grid container justifyContent="center" alignContent="center">
                <Grid item xs={12} md={6}>
                    <FAQSvg />
                </Grid>
                <Grid item xs={12} md={6} className={classes.searchRoot} >
                    <SearchContainer />
                </Grid>
            </Grid>
        </div>
    )
}
