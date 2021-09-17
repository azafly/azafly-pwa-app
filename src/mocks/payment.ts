import { v4 as uuidv4 } from 'uuid'
import { FlutterwaveConfig } from 'types/flutterwave'

const customizations = {
    "title": "Azafly Payment",
    "description": "Givingyour dreams wing",
    "logo": "https://mygreatlakes.org/mglstatic/educate/images/knowledge-center/slider/ways-steps.png"
}
export const generatePaymentRequestBody = ({ amount, user, currency }: any): FlutterwaveConfig => ({
    public_key: process.env.REACT_APP_FLUTTERWAVE_publickey as string,
    "tx_ref": `${uuidv4()}`,
    "amount": amount,
    currency,
    "payment_options": "card",
    "customer": {
        "email": 'johncode10.17@gmail.com',
        "phonenumber": user?.phoneNumber,
        "name": user?.displayName
    },
    customizations
})

const TEST_CARDS = {
    'insufficent_fund': {
        card_number: '5258585922666506', cvv: '883',
        expiry: '09/31',
        pin: '3310',
        OTP: 12345
    },
    'good': {
        card_number: '4242424242424242', cvv: '812',
        expiry: '01/31',
        pin: '3310',
        OTP: 12345
    }
}




export const defaultConfig = {
    public_key: process.env.REACT_APP_FLUTTERWAVE_publickey as string,
    tx_ref: `${uuidv4()}`,
    amount: 100,
    currency: 'NGN',
    payment_options: 'card,mobilemoney,ussd',
    customer: {
        email: 'user@gmail.com',
        phonenumber: '07064586146',
        name: 'joel ugwumadu',
    },
    customizations: {
        title: 'my Payment Title',
        description: 'Payment for items in cart',
        logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
    },
};
