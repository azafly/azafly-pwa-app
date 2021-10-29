import { Avatar, Box, Chip } from '@mui/material';
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
                    marginRight: 2,
                    borderRadius: '50%'
                },
                '& .name': {
                    margin: 'auto',
                    fontSize: '0.8rem'
                },
                '& .currency': {
                    margin: 'auto',
                    fontSize: '0.8rem'
                },
                '& .coming_soon': {
                    background: 'grey',
                    fontSize: '0.65rem'
                }
            }}
        >
            <Avatar
                style={{ borderRadius: '50%' }}
                className='flag'
                variant={'circular'}
                src={option?.flag}
                alt={`${option?.name} - flag`}
                sizes={'sm'}
            />
            <Box sx={{ width: '11ch', margin: 'auto', marginRight: 2 }}>
                <span className='name'> {option?.name} </span>
                <span className='currency'> ({option?.currency.code}) </span>
            </Box>
            {option?.isComingSoon && <Chip className='coming_soon' label={'Coming Soon'} />}
        </Box>
    );
};
