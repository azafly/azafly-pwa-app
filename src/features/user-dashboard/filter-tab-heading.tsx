import { createStyles, makeStyles, Theme, useMediaQuery } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { DateRange } from '@mui/lab/DateRangePicker';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import React, { Dispatch, ReactNode, SetStateAction, useEffect } from 'react';

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

interface TabViewProps {
    key?: string;
    heading: ReactNode;
    headingClickHandler?: any;
    component: ReactNode;
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
            [theme.breakpoints.up('xl')]: { maxWidth: 1200 }
        }
    })
);

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div role='tabpanel' hidden={value !== index} id={`scrollable-tabpanel-${index}`} aria-labelledby={`scrollable-tab-${index}`} {...other}>
            {value === index && (
                <Box pt={1}>
                    <Box>{children}</Box>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: any) {
    return {
        id: `scrollable-tab-${index}`,
        'aria-controls': `scrollable-tabpanel-${index}`
    };
}
interface TransactionFilterTabProps {
    tabViews: TabViewProps[];
    handleSetDateValue?: Dispatch<SetStateAction<DateRange<Date>>>;
    dateValue?: any;
    openDatePicker?: boolean;
    currentKey?: any;
}
export const FilterTab = ({ tabViews, currentKey }: TransactionFilterTabProps) => {
    const [value, setValue] = React.useState(0);

    const handleChange = (_: React.ChangeEvent<unknown>, newValue: number) => {
        setValue(newValue);
    };

    useEffect(() => {
        const index = tabViews.map(tab => tab.key).indexOf(currentKey);
        const value = index < 0 ? 0 : index;
        setValue(value);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentKey]);

    const classes = useStyles();
    const scrollableTabs = useMediaQuery('(max-width:950px)');
    const isScrollable = scrollableTabs ? 'scrollable' : 'standard';

    return (
        <div style={{ width: '100%' }}>
            <Tabs
                allowScrollButtonsMobile
                aria-label='scrollable tab'
                className={classes.filter_tab__container}
                onChange={handleChange}
                selectionFollowsFocus
                value={value}
                variant={isScrollable}
                scrollButtons
                centered={true}
                visibleScrollbar
            >
                {tabViews.map(({ heading, headingClickHandler }, index) => {
                    return <Tab key={index} label={heading} {...a11yProps(index)} onClick={() => headingClickHandler && headingClickHandler()} />;
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
