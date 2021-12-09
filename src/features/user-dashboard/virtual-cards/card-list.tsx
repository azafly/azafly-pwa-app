import { Slide, Typography } from '@mui/material';
import { CardContainer } from './card-container';
import { FilterTab } from '../tab';
import { Avatar, Stack } from '@mui/material';

const mockData = [
    {
        currency: 'EUR',
        countryCode: 'EU',
        amount: 100,
        cardNumber: '5346 5464 6474',
        last4digits: '7895',
        expiry: '08/24',
        cvv: '123'
    },
    {
        currency: 'GBP',
        countryCode: 'GB',
        amount: 100,
        cardNumber: '5344 5464 4474',
        last4digits: '5895',
        expiry: '02/27',
        cvv: '890'
    },
    {
        currency: 'NGN',
        countryCode: 'NG',
        amount: 780000,
        cardNumber: '5344 5464 0474',
        last4digits: '5805',
        expiry: '02/24',
        cvv: '576'
    },
    {
        currency: 'USD',
        countryCode: 'US',
        amount: 1100,
        cardNumber: '5344 5464 4474',
        last4digits: '4895',
        expiry: '02/24',
        cvv: '492'
    },
    {
        currency: 'CAD',
        countryCode: 'CA',
        amount: 100,
        cardNumber: '5344 5464 3474',
        last4digits: '7896',
        expiry: '02/27',
        cvv: '090'
    }
];

const tabs = mockData.map((cardObject: typeof mockData[0], index) => {
    const { currency, countryCode } = cardObject;
    const heading = (
        <div style={{ display: 'flex', alignItems: 'center', margin: 'auto' }} key={index}>
            {' '}
            <Avatar
                src={`https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/${countryCode}.svg`}
                sx={{ width: 20, height: 20 }}
            />
            <Typography style={{ fontSize: '0.75rem', fontFamily: 'Nunito', fontWeight: 800, marginLeft: '1ch' }}> {currency}</Typography>
        </div>
    );
    return {
        heading,
        component: <CardContainer cardObject={cardObject} />
    };
});

const CardList = () => {
    return (
        <Slide
            direction='left'
            in
            mountOnEnter
            unmountOnExit
            appear
            timeout={800}
            easing={{ enter: 'cubic-bezier(0.0, 0, 0.2, 1)', exit: 'cubic-bezier(0.4, 0, 1, 1)' }}
        >
            <Stack
                sx={{
                    width: '90vw',
                    maxWidth: 900,
                    margin: 'auto',
                    marginTop: '22vh'
                }}
            >
                <Typography gutterBottom variant={'h5'} align={'left'} fontFamily={'Nunito'} fontWeight={800}>
                    Virtual Cards
                </Typography>
                <FilterTab tabViews={tabs} />
            </Stack>
        </Slide>
    );
};

export default CardList;
