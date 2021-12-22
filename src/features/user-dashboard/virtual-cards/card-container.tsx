import { CardContent, Grid } from '@material-ui/core';
import { Card } from '@mui/material';
import { CreditCard } from './credit-card';
import { VirtualCardActions } from './card-actions';

interface VirtualCardObject {
    amount: number;
    currency: string;
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
        <Card style={{ width: '100%', boxShadow: '0 2px 16px 0 rgba(0, 0, 0, .08)', border: '1px solid #DCDCDC' }}>
            <CardContent>
                <Grid container alignItems={'center'} justifyContent={'center'}>
                    <Grid container item xs={12} md={5} alignItems={'center'} justifyContent={'center'}>
                        <CreditCard {...cardObject} />
                    </Grid>
                    <Grid container item xs={12} md={5} alignItems={'center'} justifyContent={'center'}>
                        <VirtualCardActions />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};
