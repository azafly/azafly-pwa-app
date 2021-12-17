import React from 'react';
import { Box, Grid } from '@mui/material';
import { Typography } from '@material-ui/core';

export const ConversionIcon = () => {
    return (
        <Grid sx={{ width: 150, margin: 'auto' }} alignItems={'center'} alignSelf={'center'} alignContent={'center'}>
            <Box
                sx={{
                    // background: '#fafafa',
                    // borderRadius: '50%',
                    // width: 100,
                    // height: 100,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: 'auto'
                }}
            >
                <Typography style={{ fontWeight: 900, fontSize: '3rem' }}>{'='}</Typography>
            </Box>
        </Grid>
    );
};
