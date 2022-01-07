import { Stack } from '@mui/material';
import FW from './icons/flutterwave.svg';

const supportedBy = {
    name: 'Supported By',
    logo: FW,
    alt: 'flutterwave'
};
export const SupportedMethods = () => {
    return (
        <>
            <Stack direction={'row'} alignItems={'center'} sx={{ ml: '2rem' }}>
                {' '}
                Payment processed by:&nbsp; &nbsp;
                <img alt={supportedBy.alt} className='logo' src={supportedBy.logo} width={80} height={30} />
            </Stack>
        </>
    );
};
