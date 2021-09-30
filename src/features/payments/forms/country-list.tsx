import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import { Country } from './../hooks';

const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    borderRadius: 8
}));

interface ICountryListProp {
    show: boolean;
    countryList: Country[];
}

export function CountryList({ show, countryList }: ICountryListProp) {
    return (
        <Box sx={{ flexGrow: 1, width: '100%', position: 'absolute', left: 0, top: '5.2rem', borderRadius: 8 }}>
            <Demo>
                <List dense>
                    {countryList?.map(({ flag, name, currency }) => {
                        return (
                            <ListItem
                                key={name + flag}
                                secondaryAction={
                                    <IconButton edge='end' aria-label='delete'>
                                        <span>{currency.code}</span>
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
