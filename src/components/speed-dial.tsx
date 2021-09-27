import {
    makeStyles,
    createStyles,
    Theme
} from '@material-ui/core/styles';
import { Hidden } from '@material-ui/core';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import ShareIcon from '@material-ui/icons/Share';
import { ChatSvgComponent as Chat } from './icons/chat';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        speedDial: {
            position: 'fixed',
            bottom: 120,
            right: -15,
            '& .MuiSpeedDialAction-tooltipPlacementLeft .MuiSpeedDialAction-staticTooltipLabel':
                {
                    width: 250,
                    paddingLeft: 20,
                    paddingRight: 20,
                    fontWeight: 600,
                    color: 'white',
                    marginBottom: 10,
                    borderRadius: 80,
                    background: theme.colors.base
                }
        }
    })
);

const defaultActions = [
    { icon: <Chat color='primary' />, name: 'Chat with us' },
    {
        icon: <AttachMoneyIcon color='primary' />,
        name: 'Make a new Payment'
    },
    {
        icon: <ShareIcon color='primary' />,
        name: 'Share with a friend'
    }
];

type ToolTipActionPlacement =
    | 'bottom-end'
    | 'bottom-start'
    | 'bottom'
    | 'left-end'
    | 'left-start'
    | 'left'
    | 'right-end'
    | 'right-start'
    | 'right'
    | 'top-end'
    | 'top-start'
    | 'top';
interface SpeedDialTooltipProps {
    actions?: typeof defaultActions;
    handleSpeedDialVisibility: () => void;
    handleSpeedDialClose: () => void;
    hidden: boolean;
    openSpeedDial: boolean;
    handleOpenSpeedDial: () => void;
    direction?: ToolTipActionPlacement;
}

export function SpeedDialTooltip({
    actions = defaultActions,
    direction = 'right',
    handleSpeedDialClose,
    hidden,
    openSpeedDial,
    handleOpenSpeedDial
}: SpeedDialTooltipProps) {
    const classes = useStyles();

    return (
        <Hidden smDown>
            <SpeedDial
                ariaLabel='open speed dial'
                className={classes.speedDial}
                hidden={hidden}
                icon={<SpeedDialIcon />}
                onClose={handleSpeedDialClose}
                onOpen={handleOpenSpeedDial}
                open={openSpeedDial}
            >
                {actions.map(action => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        tooltipOpen
                        style={{ width: 150 }}
                        onClick={handleSpeedDialClose}
                    />
                ))}
            </SpeedDial>
        </Hidden>
    );
}
