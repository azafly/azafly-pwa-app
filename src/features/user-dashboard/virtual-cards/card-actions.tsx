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
        actionItem: {
            cursor: 'pointer'
        },
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

interface VirtualCardActionsProps {
    currency: CurrencyCode;
}

type Action = 'top-up' | 'settings' | 'freeze' | 'pin';

interface GridItemInterface {
    avatar: JSX.Element;
    primaryText: string;
    secondaryText: string;
    action: Action;
}
export function VirtualCardActions({ currency }: VirtualCardActionsProps) {
    const classes = useStyles();
    const dispatch = useDispatch<Dispatch>();

    const GRID_ITEMS: GridItemInterface[] = [
        {
            avatar: <AddReactionIcon sx={{ color: '#4990A4' }} />,
            primaryText: 'Top-up Virtual Card',
            secondaryText: 'Add more money to your card',
            action: 'top-up'
        },
        {
            avatar: <AcUnitIcon sx={{ color: '#4990A4' }} />,
            primaryText: 'Freeze Card',
            secondaryText: 'Block Card Temporarily',
            action: 'freeze'
        },
        {
            avatar: <SecurityIcon sx={{ color: '#4990A4' }} />,
            primaryText: 'PIN and Security',
            secondaryText: 'Unblock PIN or CVV & more',
            action: 'pin'
        },
        {
            avatar: <SettingsIcon sx={{ color: '#4990A4' }} />,

            primaryText: 'Settings',
            secondaryText: `Share, Set card limit & more`,
            action: 'settings'
        }
    ];

    const handleOnActionClick = (action: Action) => {
        dispatch.payments.setBuyCurrency(currency);
        dispatch.dashboard.setCurrentCardIdentifier({ currency, action, openTopUpModal: true });
    };
    return (
        <List>
            {GRID_ITEMS.map(({ avatar, primaryText, secondaryText, action }) => {
                return (
                    <ListItem key={primaryText} className={classes.actionItem} onClick={() => handleOnActionClick(action)}>
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
