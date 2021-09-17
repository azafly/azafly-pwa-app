import { lazy, Suspense } from 'react'


const LazyPayments = lazy(() => import('features/payments'))
const SuspenseComponent = () => <div> ...Fetching payments </div>

const Payments = () => {
    return (

        <Suspense fallback={SuspenseComponent}>
            <LazyPayments />
        </Suspense>
    )
}


export default Payments