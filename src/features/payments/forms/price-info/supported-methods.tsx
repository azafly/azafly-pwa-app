import { Stack } from '@mui/material';
import Visa from './icons/visa.svg';
import FW from './icons/flutterwave.svg';
import MC from './icons/mastercard.svg';
import BANK from './icons/bank.png';
import VERVE from './icons/verve-logo.webp';

const supportedPaymentMethods = [
    {
        name: 'Online Bank',
        logo: BANK,
        alt: 'online banking'
    },
    {
        name: 'Visa',
        logo: Visa,
        alt: 'visa debit card'
    },
    {
        name: 'Master Card',
        logo: MC,
        alt: 'master debit card'
    },
    {
        name: 'Verve',
        logo: VERVE,
        alt: 'verve debit card'
    }
];

const supportedBy = {
    name: 'Supported By',
    logo: FW,
    alt: 'flutterwave'
};
export const SupportedMethods = () => {
    return (
        <>
            {/* <Stack direction={'row'} alignItems={'center'} sx={{ ml: 3 }}>
                We support:&nbsp; &nbsp;
                {supportedPaymentMethods.map(({ alt, logo, name }) => {
                    return <img alt={alt} className='logo' src={logo} key={name} width={80} height={30} />;
                })}
            </Stack> */}
            <Stack direction={'row'} alignItems={'center'} sx={{ ml: '2rem' }}>
                {' '}
                Powered By:&nbsp; &nbsp;
                <img alt={supportedBy.alt} className='logo' src={supportedBy.logo} width={80} height={30} />
            </Stack>
        </>
    );
};
