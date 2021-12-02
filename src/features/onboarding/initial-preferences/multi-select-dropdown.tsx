import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { Country } from 'types/country-data';
import { Avatar, Box } from '@material-ui/core';

const icon = <CheckBoxOutlineBlankIcon fontSize='small' />;
const checkedIcon = <CheckBoxIcon fontSize='small' />;

interface MultiSelectCheckBoxProps {
    options: readonly Country[];
    handleChange: () => void;
}
export default function MultiSelectCheckBox({ options, handleChange }: MultiSelectCheckBoxProps) {
    return (
        <Autocomplete
            multiple
            id='country-multi-select'
            onChange={handleChange}
            options={options}
            disableCloseOnSelect
            getOptionLabel={option => option.name}
            renderOption={(props, option, { selected }) => (
                <li {...props}>
                    <Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
                    <Box sx={{ marginRight: '1ch' }}>
                        {' '}
                        <Avatar sizes={'sm'} src={option.flag} alt={option.name} />{' '}
                    </Box>
                    {option.name}
                </li>
            )}
            style={{ width: 500 }}
            renderInput={params => <TextField {...params} label='Checkboxes' placeholder='Favorites' />}
        />
    );
}
