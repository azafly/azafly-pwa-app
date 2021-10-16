import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        guaranteeTag_root: {
            display: 'flex',
            alignItems: 'center',
            border: '2px solid grey',
            height: 40,
            margin: '2rem 0 2rem 2rem',
        }
    })
);
export const GuaranteeTag = () => {
    const classes = useStyles();
    return (
        <div className={classes.guaranteeTag_root}>
            <BookmarkAddedIcon style={{ color: '#4990A4' }} />
            <div className='statement'>maxWidth: 675,</div>
            <div className='terms'></div>
        </div>
    );
};
