import { Avatar, Box, Chip } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import Autocomplete from '@mui/material/Autocomplete';
import Checkbox from '@mui/material/Checkbox';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import TextField from '@mui/material/TextField';

import { RootState } from 'app/store';
import { africanCurrencies, foreignCurrencies, Currency } from 'libs/constants';

const icon = <CheckBoxOutlineBlankIcon fontSize='small' />;
const checkedIcon = <CheckBoxIcon fontSize='small' />;

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        marginBottom: 30,
        padding: '10px 20px',
        borderRadius: 8,
        backgroundColor: theme.palette.background.paper,
        boxShadow: '0 0 7px 0 #bac4cf',
        [theme.breakpoints.only('xs')]: {
            width: '100%'
        },
        '& .MuiInput-underline::before': {
            borderBottom: 'none'
        },
        '& .MuiInput-underline::after': {
            borderBottom: 'none'
        }
    }
}));

interface MultiSelectCheckBoxProps {
    handleChange: (_: unknown, value: Currency[]) => void;
}
export default function MultiSelectCheckBox({ handleChange }: MultiSelectCheckBoxProps) {
    const { country } = useSelector((state: RootState) => state.onboarding);
    const options = country?.region === 'AF' ? foreignCurrencies : africanCurrencies;

    const classes = useStyles();
    return (
        <Autocomplete
            multiple
            id='currency-multi-select'
            onChange={handleChange}
            options={options}
            disableCloseOnSelect
            getOptionLabel={option => option.name}
            getOptionDisabled={option => option.isComingSoon ?? false}
            renderOption={(props, option, { selected }) => (
                <li {...props}>
                    <Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
                    <Box sx={{ marginRight: '1ch' }}>
                        {' '}
                        <Avatar sizes={'sm'} src={option.flag} alt={option.name} />{' '}
                    </Box>
                    {option.code} {!option.isComingSoon && <span style={{ marginLeft: '2ch', fontFamily: 'Nunito' }}>{option.name}</span>}
                    {option?.isComingSoon && (
                        <Chip className='coming_soon' label={'Coming Soon'} style={{ marginLeft: '2ch', fontFamily: 'Nunito' }} />
                    )}
                </li>
            )}
            renderInput={params => (
                <TextField {...params} label='Select favorite currencies' placeholder='Favorites' classes={{ root: classes.root }} />
            )}
        />
    );
}
