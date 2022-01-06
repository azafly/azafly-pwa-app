import { CardContent, Grid } from '@material-ui/core';
import { Card } from '@mui/material';

import { CreditCard } from './credit-card';
import { CurrencyCode } from 'app/models/payments/mock';
import { VirtualCardActions } from './card-actions';

interface VirtualCardObject {
    balance: number;
    currency: CurrencyCode;
    cardNumber: string;
    last4digits: string;
    expiry: string;
    cvv: string;
    countryCode: string;
}
interface CardContainerProps {
    cardObject: VirtualCardObject;
}

export const CardContainer = ({ cardObject }: CardContainerProps) => {
    return (
        <Card style={{ boxShadow: '0 2px 16px 0 rgba(0, 0, 0, .08)', border: '1px solid #DCDCDC' }}>
            <CardContent>
                <Grid container alignItems={'center'}>
                    <Grid container item xs={12} sm={6} md={8}>
                        <CreditCard {...cardObject} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <VirtualCardActions currency={cardObject.currency} />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};
