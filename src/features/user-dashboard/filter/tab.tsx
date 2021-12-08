import React, { Dispatch, SetStateAction } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { Box, Tab, Tabs, Typography } from '@material-ui/core';

import DateRangeIcon from '@mui/icons-material/DateRange';
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
            margin: 'auto',
            boxShadow: '0 2px 16px 0 rgba(0, 0, 0, .08)',
            [theme.breakpoints.up('xl')]: { maxWidth: 1200 },
            '& .MuiTabs-flexContainer': {
                justifyContent: 'center',
                '& span': {
                    textTransform: 'none'
                }
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
    tabViews: React.ReactNode[];
    handleSetDateValue: Dispatch<SetStateAction<DateRange<Date>>>;
    dateValue: any;
    openDatePicker: boolean;
    setOpenDatePicker: Dispatch<SetStateAction<boolean>>;
}
export const TransactionFilterTab = ({ setOpenDatePicker, tabViews }: TransactionFilterTabProps) => {
    const [value, setValue] = React.useState(0);

    const handleChange = (_: React.ChangeEvent<unknown>, newValue: number) => {
        setValue(newValue);
    };

    const classes = useStyles();

    return (
        <>
            {' '}
            <Tabs value={value} onChange={handleChange} aria-label='onboarding tab' className={classes.filter_tab__container}>
                <Tab label='Transactions' {...a11yProps(0)} />
                <Tab label='Pending Offers' {...a11yProps(1)} />
                <Tab
                    aria-label='Filter'
                    {...a11yProps(2)}
                    style={{ justifySelf: 'flex-end' }}
                    icon={<DateRangeIcon />}
                    onClick={() => setOpenDatePicker(true)}
                />
            </Tabs>
            {tabViews.map((transactionCards, index) => {
                return (
                    <TabPanel value={value} index={index} key={index}>
                        {transactionCards}
                    </TabPanel>
                );
            })}
        </>
    );
};
