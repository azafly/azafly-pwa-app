import { BackwardSvgComponent } from 'components/icons';
import { createStyles, makeStyles, Theme, Hidden } from '@material-ui/core';

import { useNavigate } from 'react-router-dom';

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

export const MobileBackButton = ({ stroke, fill }: MobileBackButtonProps) => {
    const navigate = useNavigate();
    const classes = useStyles();

    const goBack = () => {
        navigate(-1);
    };

    return (
        <Hidden smUp>
            <BackwardSvgComponent onClick={goBack} fill={fill} stroke={stroke} className={classes.back} />
        </Hidden>
    );
};
