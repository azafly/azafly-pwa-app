import { Avatar, Box, List, IconButton, ListItemAvatar, ListItem, ListItemText, Paper, styled } from '@mui/material';

import { Country } from '../../hooks/use-country-list';

const ListContainer = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    borderRadius: 8,
    height: 320,
    zIndex: 999,
    overflowY: 'scroll',
    '& .code': {
        fontWeight: 900,
        color: theme.palette.text.primary,
        fontSize: '1rem'
    },
    '& .list_item': {
        cursor: 'pointer'
    }
}));

interface ICountryListProp {
    show?: boolean;
    countryList: Country[];
    handleCountryChange: (value: Country) => void;
}

export function CountryList({ countryList, handleCountryChange }: ICountryListProp) {
    return (
        <Box sx={{ flexGrow: 1, width: '100%', position: 'absolute', left: 0, top: '5.2rem', borderRadius: 8 }}>
            <ListContainer elevation={10}>
                <List dense>
                    {countryList?.map(country => {
                        const { flag, name, currency } = country;
                        return (
                            <ListItem
                                className={'list_item'}
                                onClick={() => handleCountryChange(country)}
                                key={name + flag}
                                secondaryAction={
                                    <IconButton edge='end' aria-label='delete'>
                                        <span className={'code'}>{currency.code}</span>
                                    </IconButton>
                                }
                            >
                                <ListItemAvatar>
                                    <Avatar src={flag} alt={`${name} - flag`} />
                                </ListItemAvatar>
                                <ListItemText primary={name} />
                            </ListItem>
                        );
                    })}
                </List>
            </ListContainer>
        </Box>
    );
}
