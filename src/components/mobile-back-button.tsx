import { BackwardSvgComponent } from 'components/icons';
import {
    createStyles,
    makeStyles,
    Theme,
    Hidden
} from '@material-ui/core';

import { useHistory } from 'react-router-dom';

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        back: {
            marginRight: 100
        }
    })
);

interface MobileBackButtonProps {
    stroke?: string;
    fill?: string;
}

export const MobileBackButton = ({
    stroke,
    fill
}: MobileBackButtonProps) => {
    const locationHistory = useHistory();
    const classes = useStyles();

    const goBack = () => {
        locationHistory.go(-1);
    };

    return (
        <Hidden smUp>
            <BackwardSvgComponent
                onClick={goBack}
                fill={fill}
                stroke={stroke}
                className={classes.back}
            />
        </Hidden>
    );
};
