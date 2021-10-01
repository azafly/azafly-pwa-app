import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Avatar } from '@mui/material';

import { Country } from '../../hooks';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            justifyContent: 'space-between',
            alignContent: 'center',
            marginTop: 15,
            cursor: 'pointer',
            '& .emoji': {
                fontSize: 24,
                margin: 'auto',
                marginRight: 5,
                marginLeft: 5
            },
            '& .currency': {
                marginRight: 5,
                marginLeft: 5,
                color: theme.colors.textPrimary,
                fontWeight: 750,
                fontSize: '1.3rem',
                margin: 'auto'
            },
            '& .toggle': {
                marginLeft: 20,
                color: theme.colors.base,
                margin: 'auto'
            }
        }
    })
);

interface ICountrySelectToggle {
    selectedCountry: Country;
}

export const CountrySelectToggle = ({ selectedCountry }: ICountrySelectToggle) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Avatar className='flag' variant={'circular'} src={selectedCountry?.flag} alt={`${selectedCountry?.name} - flag`} sizes={'sm'} />
            <span className={'currency'}> {selectedCountry?.currency.code}</span>
            <ArrowDropDownIcon fontSize={'large'} />
        </div>
    );
};
