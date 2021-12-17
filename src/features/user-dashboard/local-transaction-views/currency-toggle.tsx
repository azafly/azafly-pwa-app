import * as React from 'react';
import { Avatar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { Dispatch, RootState } from 'app/store';

export interface CurrencyListParams {
    country: string;
    currencyCode: string;
    active: boolean;
    flag: string;
}

interface CurrencyToggleProps {
    options: CurrencyListParams[];
}

export function CurrencyToggle({ options }: CurrencyToggleProps) {
    const [currency, setCurrency] = React.useState<CurrencyListParams>(options[0]);

    const { buyAmount, rate } = useSelector((state: RootState) => state.dashboard);
    const dispatch = useDispatch<Dispatch>();

    const getCurrentCurrency = () => {
        return options.filter(option => option.currencyCode === currency.currencyCode)[0];
    };

    const handleRateChange = (event: SelectChangeEvent) => {
        const currency = event.target.value;
        // @ts-ignore
        setCurrency(currency);
        // @ts-ignore
        dispatch.dashboard.setBuyCurrency(currency.currencyCode);
        // @ts-ignore
        dispatch.dashboard.setAsyncRateInfo(currency.currencyCode);
        dispatch.dashboard.setConvertedAmount(buyAmount * rate);
    };

    return (
        <FormControl variant='filled' sx={{ m: 1, minWidth: 120, display: 'flex', alignItems: 'center', paddingTop: -10 }}>
            <Select
                labelId='demo-simple-select-filled-label'
                id='demo-simple-select-filled'
                // @ts-ignore
                value={getCurrentCurrency()}
                onChange={handleRateChange}
                disableUnderline
                sx={{ background: 'white' }}
            >
                {options.map(option => {
                    return (
                        // @ts-ignore
                        <MenuItem value={option} key={option.currencyCode} disabled={!option.active}>
                            <Stack direction={'row'}>
                                <Avatar src={option.flag} sx={{ mr: '1ch', width: 30, height: 20 }} sizes={'small'} variant={'rounded'} />{' '}
                                <Typography sx={{ fontWeight: 700, fontFamily: 'Nunito' }}>{option.currencyCode}</Typography>
                            </Stack>
                        </MenuItem>
                    );
                })}
            </Select>
        </FormControl>
    );
}
