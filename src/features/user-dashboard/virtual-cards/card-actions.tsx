import { createStyles, makeStyles } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import SecurityIcon from '@mui/icons-material/Security';
import SettingsIcon from '@mui/icons-material/Settings';

import { CurrencyCode } from 'app/models/dashboard';
import { Dispatch } from 'app/store';

const useStyles = makeStyles(() =>
    createStyles({
        listItem__root: {
            '& span': {
                fontSize: '0.9rem !important',
                fontFamily: 'Nunito !important',
                fontWeight: 700
            },
            '& p': {
                fontSize: '0.75rem !important',
                fontFamily: 'Nunito !important',
                fontWeight: 400
            }
        }
    })
);

interface VirtualCardActions {
    currency: CurrencyCode;
}

export function VirtualCardActions({ currency }: VirtualCardActions) {
    const classes = useStyles();
    const dispatch = useDispatch<Dispatch>();

    const GRID_ITEMS = [
        {
            avatar: <AddReactionIcon sx={{ color: '#4990A4' }} />,
            primaryText: 'Top-up Virtual Card',
            secondaryText: 'Add more money to your card'
        },
        {
            avatar: <AcUnitIcon sx={{ color: '#4990A4' }} />,
            primaryText: 'Freeze Card',
            secondaryText: 'Block Card Temporarily'
        },
        {
            avatar: <SecurityIcon sx={{ color: '#4990A4' }} />,
            primaryText: 'PIN and Security',
            secondaryText: 'Unblock PIN or CVV & more'
        },
        {
            avatar: <SettingsIcon sx={{ color: '#4990A4' }} />,

            primaryText: 'Settings',
            secondaryText: `Share, Set card limit & more`
        }
    ];
    return (
        <List>
            {GRID_ITEMS.map(({ avatar, primaryText, secondaryText }) => {
                return (
                    <ListItem key={primaryText} onClick={() => console.log('hey')}>
                        <ListItemAvatar>
                            <Avatar sx={{ border: '1px solid #4990A4', background: 'white' }}>{avatar}</Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={primaryText}
                            secondary={secondaryText}
                            classes={{
                                root: classes.listItem__root
                            }}
                        />
                    </ListItem>
                );
            })}
        </List>
    );
}
