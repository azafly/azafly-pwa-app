import { memo } from 'react';

import { InfoSvgComponent } from 'components/icons';
import { useInfoTextStyles } from './classes';

interface InfoTextProps {
    text: string;
}

export const InfoText = memo(function InfoText({ text }: InfoTextProps) {
    const classes = useInfoTextStyles();
    return (
        <div className={classes.infoText_root}>
            <InfoSvgComponent /> <div className={classes.text}>{text}</div>
        </div>
    );
});
