import { Avatar, Stack } from '@mui/material';
import { CardContainer } from './card-container';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { FilterTab } from '../filter-tab-heading';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { Typography } from '@mui/material';
import Zoom from '@mui/material/Zoom';

import { Dispatch, RootState } from 'app/store';
import { mockCards } from 'app/models/cards/mocks';

import BasicModal from './modal/index';
import { TopUpForm, VirtualCardSetting } from './forms';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            width: '90vw',
            maxWidth: 900,
            margin: 'auto',
            marginTop: '12vh',
            [theme.breakpoints.only('xs')]: {
                marginTop: '10vh'
            },
            '& .tabHeader_typography': {
                fontSize: '0.95rem',
                fontFamily: 'Nunito',
                fontWeight: 800,
                paddingLeft: '1ch',
                [theme.breakpoints.only('xs')]: {
                    fontSize: '0.8rem'
                }
            },
            '& .avatar': {
                width: 30,
                height: 30,
                [theme.breakpoints.only('xs')]: {
                    width: 25,
                    height: 25
                }
            }
        }
    })
);

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
        dashboard: { currentVirtualCard },
        VIRTUAL_CARDS: { userCards }
    } = useSelector(({ dashboard, VIRTUAL_CARDS }: RootState) => ({ dashboard, VIRTUAL_CARDS }));
    const dispatch = useDispatch<Dispatch>();
    const classes = useStyles();
    const { action = 'top-up', currency: currencyKey, openTopUpModal = false } = currentVirtualCard ?? {};
    const [openModal, setOpenModal] = useState(openTopUpModal);

    const tabs = mockCards.map((cardObject: typeof mockCards[0], index) => {
        const { currency, countryCode } = cardObject;

        const heading = (
            <div style={{ display: 'flex', alignItems: 'center', margin: 'auto' }} key={index}>
                {' '}
                <Avatar
                    src={`https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/${countryCode}.svg`}
                    sx={{ width: 30, height: 30 }}
                />
                <Typography className={'tabHeader_typography'}> {currency}</Typography>
            </div>
        );
        return {
            key: currency,
            heading,
            headingClickHandler: () => {
                dispatch.dashboard.setCurrentCardIdentifier({ currency: cardObject.currency });
                dispatch.VIRTUAL_CARDS.setCurrentCard(userCards[cardObject.currency]);
                dispatch.payments.setBuyCurrency(cardObject.currency);
            },
            component: <CardContainer cardObject={cardObject} />
        };
    });

    return (
        <>
            <BasicModal handleClose={() => setOpenModal(false)} openModal={openTopUpModal || openModal}>
                {getActionModal(action)}
            </BasicModal>
            <Zoom
                in
                mountOnEnter
                unmountOnExit
                appear
                timeout={500}
                easing={{ enter: 'cubic-bezier(0.0, 0, 0.2, 1)', exit: 'cubic-bezier(0.4, 0, 1, 1)' }}
            >
                <Stack className={classes.container}>
                    <Typography gutterBottom variant={'h6'} align={'left'} fontFamily={'Nunito'} fontWeight={700}>
                        Virtual Cards
                    </Typography>
                    <FilterTab tabViews={tabs} currentKey={currencyKey} />
                </Stack>
            </Zoom>
        </>
    );
};

export default CardList;
