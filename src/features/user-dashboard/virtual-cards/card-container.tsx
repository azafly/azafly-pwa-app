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
        <Card elevation={1} style={{ width: '100%' }}>
            <CardContent>
                <Grid container alignItems={'center'}>
                    <Grid item xs={12} sm={8}>
                        <CreditCard {...cardObject} />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <VirtualCardActions />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};
