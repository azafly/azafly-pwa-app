import { AnimatePresence } from 'framer-motion'
import { lazy, Suspense } from 'react'


const LazyPayments = lazy(() => import('features/payments'))
const SuspenseComponent = () => <div> ...Fetching payments </div>

const Payments = () => {
    return (

        <Suspense fallback={SuspenseComponent}>
            <AnimatePresence exitBeforeEnter initial={false}>
                <LazyPayments />
            </AnimatePresence>
        </Suspense>
    )
}


export default Payments