
import { Link } from 'react-router-dom';


import { InputBase, Typography } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { useSearchContainerStyle } from '../classes'




const topics = [{
    label: 'Transfer money',
    link: ''
},
{
    label: 'Open new account',
    link: ''
},
{
    label: 'Free consultation',
    link: ''
}]

export const SearchContainer = () => {
    const classes = useSearchContainerStyle()
    return (
        <>
            <Typography> How can we help you</Typography>
            <div className={classes.search}>
                <div className={classes.searchIcon}>
                    <SearchIcon />
                </div>
                <InputBase
                    placeholder="Search…"
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                />
            </div>
            <Typography> Popular Topics :</Typography>
            <div>
                {topics.map(({ label, link }) => <Link to={link}>{label}</Link>)}
            </div>
        </>
    )
}
