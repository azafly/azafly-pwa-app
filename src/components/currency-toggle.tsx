import { Avatar, Box, Chip } from '@mui/material';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MenuItem from '@material-ui/core/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { Dispatch, RootState } from 'app/store';
import { PAYMENT_STATES } from 'app/models/payments';

export interface CurrencyListParams {
    country: string;
    currencyCode: string;
    active: boolean;
    flag: string;
}

interface CurrencyToggleProps {
    options: CurrencyListParams[];
    initialValue: CurrencyListParams;
    handleCurrencyChangeExtraAction?: any;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        select: {
            paddingTop: 10,
            maxWidth: 250,
            [theme.breakpoints.down('sm')]: {
                background: 8
            },
            '& img': {
                alignSelf: 'first baseline !important'
            },
            '& .MuiTypography-body1': {
                fontWeight: 700
            }
        },
        svg: {
            marginTop: -7
        }
    })
);

export function CurrencyToggle({ options, initialValue, handleCurrencyChangeExtraAction }: CurrencyToggleProps) {
    const [currency, setCurrency] = React.useState<CurrencyListParams>(initialValue);

    const dispatch = useDispatch<Dispatch>();
    const {
        dashboard: { currentVirtualCard },
        payments
    } = useSelector(({ payments, dashboard }: RootState) => ({ payments, dashboard }));

    const getCurrentCurrency = () => {
        return options.filter(option => option.currencyCode === currency?.currencyCode)[0];
    };

    const handleRateChange = async (event: SelectChangeEvent) => {
        const currencyValue = event.target.value;
        // @ts-ignore
        setCurrency(currencyValue);
        // @ts-ignore
        dispatch.payments.setBuyCurrency(currencyValue.currencyCode);
        // @ts-ignore
        dispatch.dashboard.setCurrentCardIdentifier({ ...currentVirtualCard, currency: currencyValue.currencyCode });
        dispatch.payments.setTotalToPayInSellCurrencyAsync(null);
        // @ts-ignore
        dispatch.VIRTUAL_CARDS.setCurrentCard(currencyValue.currencyCode);
        dispatch.payments.setOfferBasedOnRate(null);
        handleCurrencyChangeExtraAction && handleCurrencyChangeExtraAction({ ...payments.apiFetchState, message: PAYMENT_STATES.GROUND_ZERO });
    };

    const classes = useStyles();

    return (
        <Box sx={{ padding: '14px', borderTopRightRadius: 4, borderBottomRightRadius: 4, maxWidth: 250 }}>
            <FormControl
                classes={{ root: classes.select }}
                variant='filled'
                sx={{ minWidth: 120, display: 'flex', alignItems: 'center', paddingTop: '0rem', maxWidth: 250 }}
            >
                <Select
                    labelId='demo-simple-select-filled-label'
                    id='demo-simple-select-filled'
                    // @ts-ignore
                    value={getCurrentCurrency()}
                    onChange={handleRateChange}
                    // @ts-ignore
                    defaultValue={initialValue}
                    disableUnderline
                    sx={{
                        background: 'transparent',
                        marginTop: '-15px',
                        marginBottom: '-2rem'
                    }}
                    IconComponent={KeyboardArrowDownIcon}
                    classes={{ filled: classes.select, select: classes.select, icon: classes.svg }}
                >
                    {options.map(option => {
                        return (
                            <MenuItem
                                // @ts-ignore
                                value={option}
                                key={option.currencyCode}
                                disabled={!option.active}
                                sx={{ height: '50px' }}
                            >
                                <Stack direction={'row'} sx={{ mb: 1, mt: '-7px !important' }}>
                                    <Avatar
                                        src={option.flag}
                                        sx={{ mr: '0.8ch', height: '25px !important', width: '30px !important' }}
                                        sizes={'small'}
                                    />{' '}
                                    <Typography fontWeight={700} sx={{ fontFamily: 'Nunito', mr: '1ch' }}>
                                        {option.currencyCode}
                                    </Typography>
                                    {!option.active && <Chip label={'Coming Soon'} sx={{ marginLeft: '2ch' }} size={'small'} />}
                                </Stack>
                            </MenuItem>
                        );
                    })}
                </Select>
            </FormControl>
        </Box>
    );
}
