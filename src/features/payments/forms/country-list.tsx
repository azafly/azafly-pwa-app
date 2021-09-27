import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import { Country } from './country-form-elements/use-country-list';



const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    borderRadius: 8,
}));

interface CountryListProp {
    countries: Country[]
}



export function CountryList({ countries }: CountryListProp) {
    return (
        <Box sx={{ flexGrow: 1, width: '100%', position: 'absolute', left: 0, top: '5.1rem', borderRadius: 8, }}>
            <Demo>
                <List dense>
                    {countries.map(({ emoji, name, currency }) => {
                        return <ListItem
                            secondaryAction={
                                <IconButton edge="end" aria-label="delete">
                                    <span>{currency}</span>
                                </IconButton>
                            }
                        >
                            <ListItemAvatar>
                                <Avatar>
                                    {emoji}
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={name}
                            />
                        </ListItem>
                    })
                    }
                </List>
            </Demo>
        </Box>
    );
}