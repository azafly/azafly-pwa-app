// import axios from 'axios'
// import { useFlutterwave } from 'flutterwave-react-v3';
// import { useState } from 'react'


// import { FlutterwaveConfig } from 'types/flutterwave'
// import { closePaymentModal } from 'flutterwave-react-v3';

// const PAYMENT_SUCCESS_PROCESSING_URL = 'https://us-central1-pick-safe.cloudfunctions.net/processPaymentSuccess'

// const isProduction = process.env.NODE_ENV === 'production'



// interface FlutterWaveServiceProps {
//     flutterWavePaymentConfig: FlutterwaveConfig,
// }


// const verifyPayment = async (paymentId: number) => {
//     const VERIFY_ENDPOINT = `https://api.flutterwave.com/v3/transactions/${paymentId}/verify`
//     try {
//         const { data: { data } } = await axios.get(VERIFY_ENDPOINT, { headers: { Authorization: `Bearer ${process.env.REACT_APP_FLUTTERWAVE_secret_key}` } })
//         return data
//     } catch (error) {
//         return false
//     }
// }

// // generate invoice and send Email
// const processSuccessfullPayment = async (transaction_id: number) => {
//     const SUCCESSFUL = 'successful'
//     try {
//         const { status } = await verifyPayment(transaction_id)
//         if (status === SUCCESSFUL) {
//             const { data } = await axios.post(PAYMENT_SUCCESS_PROCESSING_URL, { transaction_id })
//             return data
//         }
//     } catch (error) {
//         console.warn(error)
//     }

// }



// export const useFlutterWaveService = ({ flutterWavePaymentConfig }: FlutterWaveServiceProps) => {
//     const [isSuccessPayment, setPaymentSuccess] = useState(false)
//     const handleFlutterPayment = useFlutterwave(flutterWavePaymentConfig);


//     const paymentHandler = () => {
//         return handleFlutterPayment({
//             callback: (response) => {
//                 const { transaction_id } = response
//                 processSuccessfullPayment(transaction_id).then((data) => setPaymentSuccess(data)).then(() => closePaymentModal())
//             },
//             onClose: () => { },
//         });
//     }

//     return {
//         paymentHandler,
//         isSuccessPayment
//     }
// }

export {}