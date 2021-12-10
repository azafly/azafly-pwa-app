import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import { Card } from '@mui/material';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        guaranteeTag_root: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: 40,
            background: 'white',
            margin: '2rem 0 0.5rem 0rem',
            borderRadius: 4,
            minWidth: 270,
            [theme.breakpoints.only('xs')]: {
                margin: 0,
                width: '100%',
                marginTop: 40
            }
        },
        statement: {
            justifySelf: 'flex-start',
            fontWeight: 800
        },
        '& .icon': {}
    })
);

interface GuaranteeTagProps {
    isLoading: boolean;
}
export const GuaranteeTag = ({ isLoading }: GuaranteeTagProps) => {
    const classes = useStyles();
    return (
        <Card elevation={0} className={classes.guaranteeTag_root}>
            {isLoading ? (
                <span className={classes.statement}>Getting you the best rate...</span>
            ) : (
                <>
                    <BookmarkAddedIcon style={{ color: '#4990A4', marginRight: '1rem' }} />
                    <div className={classes.statement}>Hurray!! You got the best rate&nbsp; 🎉</div>
                </>
            )}
        </Card>
    );
};
