import { PaymentProvider } from './context';
import { useSPaymentsStyles } from './classes';
import { VerticalPaymentStepper } from './stepper';

const Payments = () => {
    const classes = useSPaymentsStyles();
    return (
        <>
            <div className={classes.root}>
                <PaymentProvider>
                    <VerticalPaymentStepper />
                </PaymentProvider>
            </div>
        </>
    );
};

export default Payments;
