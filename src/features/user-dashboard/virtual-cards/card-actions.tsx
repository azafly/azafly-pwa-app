import { createStyles, makeStyles } from '@material-ui/core';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import SecurityIcon from '@mui/icons-material/Security';
import SettingsIcon from '@mui/icons-material/Settings';

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

export function VirtualCardActions() {
    const classes = useStyles();
    return (
        <List sx={{ width: '100%', maxWidth: 360 }}>
            {GRID_ITEMS.map(({ avatar, primaryText, secondaryText }) => {
                return (
                    <ListItem key={primaryText}>
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

{
    /* <ListItem>
<ListItemAvatar>
    <Avatar sx={{ border: '1px solid #4990A4', background: 'white' }}>
       
    </Avatar>
</ListItemAvatar>
<ListItemText

    classes={{
        root: classes.listItem__root
    }}
/>
</ListItem>
<ListItem>
<ListItemAvatar>
    <Avatar sx={{ border: '1px solid #4990A4', background: 'white' }}>
    
    </Avatar>
</ListItemAvatar>
<ListItemText
   
    classes={{
        root: classes.listItem__root
    }}
/>
</ListItem>
<ListItem>
<ListItemAvatar>
    <Avatar sx={{ border: '1px solid #4990A4', background: 'white' }}>
        
</ListItemAvatar>
<ListItemText

    classes={{
        root: classes.listItem__root
    }}
/>
</ListItem>
</List> */
}
