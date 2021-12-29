import { Box, Chip } from '@mui/material';
import { Country } from '../../../hooks/use-country-list';

export interface IRenderOptions {
    option?: Country;
}

export const RenderOptions = ({ option }: IRenderOptions) => {
    return (
        <Box
            sx={{
                display: 'flex',
                overflowX: 'hidden',

                '& .flag': {
                    margin: 'auto',
                    borderRadius: '50%'
                },
                '& .name': {
                    margin: 'auto',
                    fontSize: '0.90rem'
                },
                '& .currency': {
                    margin: 'auto',
                    fontSize: '0.85rem'
                },
                '& .coming_soon': {
                    background: 'grey',
                    fontSize: '0.65rem'
                },
                '& > span': {
                    marginRight: 2
                }
            }}
        >
            <span style={{ borderRadius: '50%', fontSize: '2rem' }}> {option?.emoji}</span>
            <Box sx={{ margin: 'auto', marginRight: 2 }}>
                <span className='name'> {option?.currency.code} </span>
                <span className='currency'> {option?.currency.name} </span>
            </Box>
            {option?.isComingSoon && <Chip className='coming_soon' label={'Coming Soon'} />}
        </Box>
    );
};
