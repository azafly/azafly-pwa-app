import React, { Dispatch, SetStateAction } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { Box, Typography } from '@material-ui/core';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import { DateRange } from '@mui/lab/DateRangePicker';

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        filter_tab__container: {
            cursor: 'pointer',
            borderRadius: 8,
            border: '1px solid #DCDCDC',
            background: 'white',
            maxWidth: 900,
            width: '100%',
            margin: 'auto',
            boxShadow: '0 2px 16px 0 rgba(0, 0, 0, .08)',
            [theme.breakpoints.up('xl')]: { maxWidth: 1200 },
            '& .MuiTabs-flexContainer': {
                justifyContent: 'center',
                '& span': {
                    textTransform: 'none'
                }
            }
        },
        tabHeader: {
            fontSize: '0.8em',
            fontWeight: 800,
            '& button': {
                fontSize: '0.6em'
            }
        }
    })
);

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div role='tabpanel' hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
            {value === index && (
                <Box pt={1}>
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
interface TransactionFilterTabProps {
    tabViews: any[];
    handleSetDateValue?: Dispatch<SetStateAction<DateRange<Date>>>;
    dateValue?: any;
    openDatePicker?: boolean;
}
export const FilterTab = ({ tabViews }: TransactionFilterTabProps) => {
    const [value, setValue] = React.useState(0);

    const handleChange = (_: React.ChangeEvent<unknown>, newValue: number) => {
        setValue(newValue);
    };

    const classes = useStyles();

    return (
        <div style={{ width: '100%' }}>
            {' '}
            <Tabs
                value={value}
                onChange={handleChange}
                aria-label='onboarding tab'
                variant='scrollable'
                allowScrollButtonsMobile
                className={classes.filter_tab__container}
            >
                {tabViews.map(({ heading, headingClickHandler, headingIcon }, index) => {
                    return (
                        <Tab
                            key={index}
                            label={heading}
                            {...a11yProps(index)}
                            icon={headingIcon ? headingIcon : ''}
                            onClick={() => headingClickHandler && headingClickHandler(true)}
                        />
                    );
                })}
            </Tabs>
            {tabViews.map(({ component }, index) => {
                return (
                    <TabPanel value={value} index={index} key={index}>
                        {component}
                    </TabPanel>
                );
            })}
        </div>
    );
};
