import { Avatar, Box } from '@mui/material';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { Dispatch } from 'app/store';

export interface CurrencyListParams {
    country: string;
    currencyCode: string;
    active: boolean;
    flag: string;
}

interface CurrencyToggleProps {
    options: CurrencyListParams[];
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        select: {
            paddingTop: 10,
            maxWidth: 300,
            [theme.breakpoints.down('sm')]: {
                background: 8
            },
            '& img': {
                alignSelf: 'first baseline !important'
            }
        }
    })
);

export function CurrencyToggle({ options }: CurrencyToggleProps) {
    const [currency, setCurrency] = React.useState<CurrencyListParams>(options[0]);

    const dispatch = useDispatch<Dispatch>();

    const getCurrentCurrency = () => {
        return options.filter(option => option.currencyCode === currency.currencyCode)[0];
    };

    const handleRateChange = (event: SelectChangeEvent) => {
        const currency = event.target.value;
        // @ts-ignore
        setCurrency(currency);
        // @ts-ignore
        dispatch.localPayments.setBuyCurrency(currency.currencyCode);
        // @ts-ignore
        dispatch.localPayments.setTotalToPayInSellCurrency(null);
    };

    const classes = useStyles();
    return (
        <Box sx={{ padding: '14px', borderTopRightRadius: 4, borderBottomRightRadius: 4, maxWidth: 300 }}>
            <FormControl
                classes={{ root: classes.select }}
                variant='filled'
                sx={{ minWidth: 120, display: 'flex', alignItems: 'center', paddingTop: '0rem' }}
            >
                <Select
                    labelId='demo-simple-select-filled-label'
                    id='demo-simple-select-filled'
                    // @ts-ignore
                    value={getCurrentCurrency()}
                    onChange={handleRateChange}
                    disableUnderline
                    sx={{
                        background: 'transparent',
                        marginTop: '-15px',
                        marginBottom: '-2rem'
                    }}
                    IconComponent={KeyboardArrowDownIcon}
                    classes={{ filled: classes.select, select: classes.select }}
                >
                    {options.map(option => {
                        return (
                            // @ts-ignore
                            <MenuItem value={option} key={option.currencyCode} disabled={!option.active}>
                                <Stack direction={'row'} sx={{ marginTop: '-7px !important' }}>
                                    <Avatar
                                        src={option.flag}
                                        sx={{ mr: '0.8ch', height: '20px', width: '30px' }}
                                        sizes={'small'}
                                        variant={'rounded'}
                                    />{' '}
                                    <Typography sx={{ fontWeight: 700, fontFamily: 'Nunito', mr: '1ch' }}>{option.currencyCode}</Typography>
                                </Stack>
                            </MenuItem>
                        );
                    })}
                </Select>
            </FormControl>
        </Box>
    );
}
