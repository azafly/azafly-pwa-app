import * as React from 'react';
import { createStyles, makeStyles, Theme, Avatar } from '@material-ui/core';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';

import { Country, useCountryList } from 'features/payments/hooks/use-country-list';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        option: {
            fontSize: '0.9em',
            fontFamily: 'Nunito',
            fontWeight: 600,
            display: 'flex',
            justifyContent: 'space-between'
        },
        optionBox: {
            display: 'flex',
            '& .flag': {
                margin: 'auto',
                marginRight: 2,
                borderRadius: '50%'
            },
            '& .name': {
                margin: 'auto',
                fontSize: '0.8rem'
            },
            '& .currency': {
                margin: 'auto',
                fontSize: '0.8rem'
            },
            '& .coming_soon': {
                background: 'grey',
                fontSize: '0.65rem'
            }
        }
    })
);

interface IRenderOptions {
    option: Country;
}
export const RenderOptions = ({ option }: IRenderOptions) => {
    const classes = useStyles();
    return (
        <div className={classes.optionBox}>
            <span> {option?.flag}</span>
            <Avatar src={option?.phone} />
        </div>
    );
};

export function AsyncPhoneNumberList() {
    const [open, setOpen] = React.useState(false);
    const { currentlySupportedCountries, isLoadingCountryList } = useCountryList();

    const optionRenderer = (optionData: any) => {
        console.log(optionData);
        return <RenderOptions option={optionData} />;
    };
    console.log('hey', currentlySupportedCountries);
    const classes = useStyles();
    return (
        <Autocomplete
            classes={{ option: classes.option }}
            id='asynchronous-demo'
            disablePortal
            sx={{ width: 150 }}
            open={open}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}
            onChange={(_, country) => {
                console.log(_, country);
            }}
            getOptionLabel={option => `${option.phone} ${option.code}`}
            options={currentlySupportedCountries}
            loading={isLoadingCountryList}
            renderInput={params => (
                <TextField
                    {...params}
                    variant={'standard'}
                    label='country code'
                    defaultValue={'+234'}
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <React.Fragment>
                                {isLoadingCountryList ? <CircularProgress color='inherit' size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                        )
                    }}
                />
            )}
        />
    );
}
