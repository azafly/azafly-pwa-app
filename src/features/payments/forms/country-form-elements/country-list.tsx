import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';

import { Country } from '../../hooks';

const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    borderRadius: 8,
    height: 320,
    boxShadow: 'rgb(0 27 71 / 16%) -20px -29px 90px -25px',
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
            <Demo>
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
            </Demo>
        </Box>
    );
}
