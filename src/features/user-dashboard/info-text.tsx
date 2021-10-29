import { memo } from 'react';

import { InfoSvgComponent } from 'components/icons';
import { useInfoTextStyles } from './classes';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

interface InfoTextProps {
    text: string;
}

export const InfoText = memo(function InfoText({ text }: InfoTextProps) {
    const classes = useInfoTextStyles();
    return (
        <div className={classes.infoText_root}>
            <InfoSvgComponent /> <div className={classes.text}>{text}</div>
            <KeyboardArrowDownIcon />
        </div>
    );
});
