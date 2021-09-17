import { Grid, Hidden } from '@material-ui/core';

import { SignUpSVG } from 'components/illustrations/sign-up';



export const OnboardingIllustration = () => {

    return (
        <Hidden xsDown>
            <Grid item xs={12} sm={6} container justify={'center'}>
                <SignUpSVG width={350} style={{ marginTop: '20vh' }} />
            </Grid>
        </Hidden>


    )
}
