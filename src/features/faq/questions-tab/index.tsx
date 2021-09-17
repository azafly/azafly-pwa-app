import React, { useEffect, useMemo, useState } from 'react';
import { useTabStyles } from '../classes';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';



import { getFakeArticles, categories } from 'mocks/faq'
import { CollapsibleList } from './collapsible-list'


type TabValue = 'general' | 'payments' | 'visa and immigration' | 'refund' | 'services'

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
    isVertical?: boolean
}

function TabPanel(props: TabPanelProps,) {
    const { children, value, index, isVertical, ...other } = props;
    const tabOrientation = isVertical ? 'vertical' : 'horizontal'

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`${tabOrientation}-tabpanel-${index}`}
            aria-labelledby={`${tabOrientation}-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: any, isVertical?: boolean) {
    const tabOrientation = isVertical ? 'vertical' : 'horizontal'
    return {
        id: `${tabOrientation}-tab-${index}`,
        'aria-controls': `${tabOrientation}-tabpanel-${index}`,
    };
}


interface QuestionsTabsConatinerProps {
    isVertical?: boolean
}


export function QuestionsTabsConatiner({ isVertical = true }: QuestionsTabsConatinerProps) {
    const classes = useTabStyles();
    const [articles, setArticles] = useState<any>([])
    const [value, setValue] = useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    useEffect(() => {
        getFakeArticles.then(response => {
            setArticles(response)
        })
    }, [])


    const tabOrientation = isVertical ? 'vertical' : 'horizontal'


    return (
        <div className={classes.tabContainer}>
            <Typography className={classes.title} variant="h5" gutterBottom color='secondary'>Frequently Asked Questions</Typography>
            <div className={classes.root}>
                <Tabs
                    orientation={tabOrientation}
                    value={value}
                    onChange={handleChange}
                    aria-label="faq tabs"
                    className={classes.tabs}
                >
                    {articles.map((article: any, index: number) => {
                        return <Tab label={article[0]} {...a11yProps(index)} />
                    })}
                </Tabs>
                {articles.map((article: any, index: number) => {
                    return <TabPanel value={value} index={index} >
                        <CollapsibleList articles={article[1]} />
                    </TabPanel>
                })}
            </div>
        </div>
    );
}
