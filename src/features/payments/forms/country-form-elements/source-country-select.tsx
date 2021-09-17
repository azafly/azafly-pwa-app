import { makeStyles, Theme } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';




import { useCountryList, Country } from './use-country-list'
const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width: 350,
        marginRight: 20,
        marginBottom: 30,
        [theme.breakpoints.only('xs')]: {
            width: 270
        }
    },
    option: {
        fontSize: 15,
        '& > span': {
            marginRight: 10,

        },
        '& .emoji': {
            fontSize: 24,
        },
        '& .name': {
            marginRight: 5,
            color: theme.colors.black,
            fontWeight: 550,

        },
        '& .coming-soon': {
            background: 'grey',
            border: '1px solid inherit',
            padding: 5,
            borderRadius: 6,
            marginLeft: 10
        },
    },
}),
);

interface CountrySelectProps {
    handleCountryChange: (event: any, value: any,) => void
}

export const CountrySelect = ({ handleCountryChange }: CountrySelectProps) => {
    const { topSources: countries, NIGERIA } = useCountryList();


    const classes = useStyles();
    return (
        <Autocomplete
            id="country-select"
            className={classes.root}
            options={countries as Country[]}
            classes={{
                option: classes.option,
            }}
            onChange={handleCountryChange}
            defaultValue={NIGERIA}
            autoHighlight
            getOptionDisabled={option => option.isComingSoon || option.isNotSupported}
            getOptionLabel={(option) => `${option.name}`}
            renderOption={(option) => (
                <>
                    <span className='emoji'> {option.emoji}</span>
                    <span className='name'>{option.name}&nbsp;</span>
                    {option.isComingSoon && <span className="coming-soon">&nbsp;{'Coming Soon'}</span>}

                </>
            )}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Country or Source"
                    variant="outlined"
                    inputProps={{
                        ...params.inputProps,
                    }}
                />
            )}
        />
    );
}
