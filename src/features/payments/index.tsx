


import { VerticalPaymentStepper } from './stepper'
import { NavBar } from 'components/navBar';
import { useSPaymentsStyles } from './classes'



export default () => {
    const classes = useSPaymentsStyles()
    return (
        <div className={classes.root}>
            <NavBar />
            <VerticalPaymentStepper />
        </div>
    )
}
