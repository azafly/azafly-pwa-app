import { usePaymentsStyles } from './classes';
import { VerticalPaymentStepper } from './stepper';

const Payments = () => {
    const classes = usePaymentsStyles();
    return (
        <>
            <div className={classes.root}>
                <VerticalPaymentStepper />
            </div>
        </>
    );
};

export default Payments;
