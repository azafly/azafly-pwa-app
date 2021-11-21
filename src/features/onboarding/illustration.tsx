import { Grid, Hidden } from '@material-ui/core';

import { SignUpSVG } from 'components/illustrations/sign-up';

export const OnboardingIllustration = () => {
    return (
        <Hidden smDown>
            <Grid item xs={12} md={6} container justify={'center'} alignItems={'center'} style={{ background: '#0d324d' }}>
                <SignUpSVG width={350} />
            </Grid>
        </Hidden>
    );
};
