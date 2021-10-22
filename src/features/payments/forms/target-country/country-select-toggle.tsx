import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Avatar } from '@mui/material';

import { Country } from '../../hooks/use-country-list';
import { ThreeDots } from 'components/css-loaders/three-dots/three-dots';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            justifyContent: 'space-between',
            alignContent: 'center',
            cursor: 'pointer',
            marginBottom: -10,
            '& .flag': {
                margin: 'auto',
                marginRight: 5,
                marginLeft: 5,
                fontSize: '1.1rem'
            },
            '& .currency': {
                marginRight: 5,
                marginLeft: 5,
                color: theme.colors.textPrimary,
                fontWeight: 750,
                fontSize: '1.1rem',
                margin: 'auto',
                [theme.breakpoints.only('xs')]: {
                    marginRight: 1
                }
            },
            '& .toggle': {
                marginLeft: 20,
                color: theme.colors.base,
                margin: 'auto',
                [theme.breakpoints.only('xs')]: {
                    marginLeft: 10
                }
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
            {selectedCountry ? (
                <Avatar className='flag' variant={'rounded'} src={selectedCountry?.flag} alt={`${selectedCountry?.name} - flag`} sizes={'sm'} />
            ) : (
                <ThreeDots />
            )}
            <span className={'currency'}> {selectedCountry?.currency.code}</span>
            <ArrowDropDownIcon fontSize={'large'} />
        </div>
    );
};
