import { Avatar, Stack } from '@mui/material';
import { CardContainer } from './card-container';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { FilterTab } from '../filter-tab-heading';
import { Slide, Typography } from '@mui/material';
import { useState } from 'react';

import { CurrencyCode } from 'app/models/dashboard';
import { RootState } from 'app/store';
import { useSelector } from 'react-redux';

import BasicModal from './modal/index';
import { TopUpForm, VirtualCardSetting } from './forms';

interface VirtualCardObject {
    currency: CurrencyCode;
    countryCode: string;
    amount: number;
    cardNumber: string;
    last4digits: string;
    expiry: string;
    key: string;
    cvv: string;
}

const mockData: VirtualCardObject[] = [
    {
        currency: 'EUR',
        key: 'EUR',
        countryCode: 'EU',
        amount: 100,
        cardNumber: '5346 5464 6474',
        last4digits: '7895',
        expiry: '08/24',
        cvv: '123'
    },
    {
        currency: 'GBP',
        key: 'GBP',
        countryCode: 'GB',
        amount: 100,
        cardNumber: '5344 5464 4474',
        last4digits: '5895',
        expiry: '02/27',
        cvv: '890'
    },
    {
        currency: 'NGN',
        key: 'NGN',
        countryCode: 'NG',
        amount: 780000,
        cardNumber: '5344 5464 0474',
        last4digits: '5805',
        expiry: '02/24',
        cvv: '576'
    },
    {
        currency: 'USD',
        key: 'USD',
        countryCode: 'US',
        amount: 1100,
        cardNumber: '5344 5464 4474',
        last4digits: '4895',
        expiry: '02/24',
        cvv: '492'
    },
    {
        currency: 'CAD',
        key: 'CAD',
        countryCode: 'CA',
        amount: 100,
        cardNumber: '5344 5464 3474',
        last4digits: '7896',
        expiry: '02/27',
        cvv: '090'
    }
];

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            width: '90vw',
            maxWidth: 900,
            margin: 'auto',
            marginTop: '14vh',
            '& .tabHeader_typography': {
                fontSize: '0.75rem',
                fontFamily: 'Nunito',
                fontWeight: 800,
                paddingLeft: '1ch'
            }
        }
    })
);

const tabs = mockData.map((cardObject: typeof mockData[0], index) => {
    const { currency, countryCode } = cardObject;

    const heading = (
        <div style={{ display: 'flex', alignItems: 'center', margin: 'auto' }} key={index}>
            {' '}
            <Avatar
                src={`https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/${countryCode}.svg`}
                sx={{ width: 20, height: 20 }}
            />
            <Typography className={'tabHeader_typography'}> {currency}</Typography>
        </div>
    );
    return {
        key: currency,
        heading,
        component: <CardContainer cardObject={cardObject} />
    };
});

function getActionModal(action: any) {
    switch (action) {
        case 'top-up':
            return <TopUpForm />;
        case 'settings':
            return <VirtualCardSetting />;
        default:
            return <TopUpForm />;
    }
}
const CardList = () => {
    const {
        currentVirtualCard: { action = 'top-up', currency, openTopUpModal = false }
    } = useSelector((state: RootState) => state.dashboard);
    const [openModal, setOpenModal] = useState(openTopUpModal);

    const classes = useStyles();
    return (
        <>
            <BasicModal handleClose={() => setOpenModal(false)} openModal={openTopUpModal || openModal}>
                {getActionModal(action)}
            </BasicModal>
            <Slide
                direction='left'
                in
                mountOnEnter
                unmountOnExit
                appear
                timeout={800}
                easing={{ enter: 'cubic-bezier(0.0, 0, 0.2, 1)', exit: 'cubic-bezier(0.4, 0, 1, 1)' }}
            >
                <Stack className={classes.container}>
                    <Typography gutterBottom variant={'h6'} align={'left'} fontFamily={'Nunito'} fontWeight={700}>
                        Virtual Cards
                    </Typography>
                    <FilterTab tabViews={tabs} currentKey={currency} />
                </Stack>
            </Slide>
        </>
    );
};

export default CardList;
