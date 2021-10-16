import { VerticalPaymentStepper } from './stepper';
import { NavBar } from 'features/user-dashboard/nav-bar';
import { useSPaymentsStyles } from './classes';
import { PaymentProvider } from './context';

const Payments = () => {
    const classes = useSPaymentsStyles();
    return (
        <>
            <NavBar />
            <div className={classes.root}>
                <PaymentProvider>
                    <VerticalPaymentStepper />
                </PaymentProvider>
            </div>
        </>
    );
};

export default Payments;
