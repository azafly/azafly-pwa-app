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
            margin: '2rem 0 2rem 2rem',
            borderRadius: 4
        },
        '& .statement': {
            justifySelf: 'flex-start'
        },
        '& .icon': {}
    })
);
export const GuaranteeTag = () => {
    const classes = useStyles();
    return (
        <div className={classes.guaranteeTag_root}>
            <BookmarkAddedIcon style={{ color: '#4990A4', marginRight: '1rem' }} />
            <div className='statement'>Congrats We found you the best rates 🎉 &nbsp; !!</div>
        </div>
    );
};
