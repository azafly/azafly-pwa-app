import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import SecurityIcon from '@mui/icons-material/Security';
import SettingsIcon from '@mui/icons-material/Settings';
import { createStyles, makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
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
            <ListItem>
                <ListItemAvatar>
                    <Avatar sx={{ border: '1px solid #4990A4', background: 'white' }}>
                        <AcUnitIcon sx={{ color: '#4990A4' }} />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary='Freeze Card'
                    secondary='Block Card Temporarily'
                    classes={{
                        root: classes.listItem__root
                    }}
                />
            </ListItem>
            <ListItem>
                <ListItemAvatar>
                    <Avatar sx={{ border: '1px solid #4990A4', background: 'white' }}>
                        <SecurityIcon sx={{ color: '#4990A4' }} />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary='PIN and Security'
                    secondary='Unblock PIN or CVV & more'
                    classes={{
                        root: classes.listItem__root
                    }}
                />
            </ListItem>
            <ListItem>
                <ListItemAvatar>
                    <Avatar sx={{ border: '1px solid #4990A4', background: 'white' }}>
                        <SettingsIcon sx={{ color: '#4990A4' }} />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary='Settings'
                    secondary={`Remove or rename cards & more`}
                    classes={{
                        root: classes.listItem__root
                    }}
                />
            </ListItem>
        </List>
    );
}
