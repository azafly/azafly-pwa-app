interface Customer {
    email: string,
    phonenumber: string
    name: string
}
const customer: Customer = {
    "email": "user@gmail.com",
    "phonenumber": "080****4528",
    "name": "Yemi Desola"
}

type Customizations = {
    title: string
    description: string,
    logo?: string
}


type PaymentOptions = 'account' | 'card' | 'banktransfer' | 'ussd'
export interface PaymentRequestInput {
    public_key: string
    tx_ref: string
    amount: number
    currency: string,
    redirect_url: string
    payment_options: string | PaymentOptions,
    customer: Customer
    customizations: Customizations,
    meta?: object
}

