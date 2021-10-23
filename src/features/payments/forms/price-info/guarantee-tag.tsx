import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        guaranteeTag_root: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: `1px solid ${theme.colors.base}`,
            height: 40,
            margin: '2rem 0 2rem 0rem',
            borderRadius: 4
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
        <div className={classes.guaranteeTag_root}>
            {isLoading ? (
                <span className={classes.statement}>Getting you the best rate...</span>
            ) : (
                <>
                    <BookmarkAddedIcon style={{ color: '#4990A4', marginRight: '1rem' }} />
                    <div className={classes.statement}>Hurray!! You got the best rate&nbsp; 🎉</div>
                </>
            )}
        </div>
    );
};
