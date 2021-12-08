import React, { useEffect } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Box, Grid, Tabs, Tab, Typography } from '@material-ui/core';

import { SignUpForm } from './sign-up/form';
import { SignInForm } from './sign-in/form';

import { Logo1SvgComponent } from 'components/icons/logo-1';

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div role='tabpanel' hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: any) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`
    };
}

const useStyles = makeStyles((theme: Theme) => ({
    onboardingTabRoot: {
        flexGrow: 1,
        margin: 'auto',
        maxWidth: 650,
        [theme.breakpoints.down('sm')]: {
            width: '100vw',
            marginTop: 90,
            overflowX: 'hidden'
        },
        '& .MuiTabs-flexContainer': {
            justifyContent: 'center',
            '& span': {
                textTransform: 'none'
            }
        },
        '& .PrivateTabIndicator-colorSecondary-92': {
            backgroundColor: theme.colors.base
        },
        '& .PrivateTabIndicator-colorSecondary-24': {
            backgroundColor: theme.colors.base
        }
    }
}));

export function OnboardingTab() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (_: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    const location = window.location.href;

    useEffect(() => {
        if (location.includes('signin')) setValue(1);
        else {
            setValue(0);
        }
    }, [location]);

    return (
        <Grid item xs={12} sm={6} className={classes.onboardingTabRoot} alignItems={'center'}>
            <Typography variant={'h4'} gutterBottom style={{ fontWeight: 700, marginTop: 30 }} align={'center'}>
                <Logo1SvgComponent />
            </Typography>
            <Tabs value={value} onChange={handleChange} aria-label='onboarding tab'>
                <Tab label='Create Account' {...a11yProps(0)} />
                <Tab label='Log in' {...a11yProps(1)} />
            </Tabs>
            <TabPanel value={value} index={0}>
                <SignUpForm />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <SignInForm />
            </TabPanel>
        </Grid>
    );
}
