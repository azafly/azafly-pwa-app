import * as React from 'react';
import { styled, Box } from '@mui/system';
import { Alert, AlertTitle } from '@material-ui/lab';
import ModalUnstyled from '@mui/core/ModalUnstyled';
import Snackbar from '@mui/material/Snackbar';

const StyledModal = styled(ModalUnstyled)`
    position: fixed;
    z-index: 1300;
    right: 0;
    bottom: 0;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Backdrop = styled('div')`
    z-index: -1;
    position: fixed;
    right: 0;
    bottom: 0;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    -webkit-tap-highlight-color: transparent;
`;

const style = {
    width: 400,
    bgcolor: 'white',
    borderRadius: 2,
    p: 2,
    px: 4,
    pb: 3
};
const StyledAlert = styled(Alert)`
        margin: 15;
        overflowWrap: 'break-word;
`;

export default function ReviewModal() {
    const [open, setOpen] = React.useState(false);
    const [openSnackBar, setOpenSnackBar] = React.useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleCloseSnackBar = () => setOpenSnackBar(false);

    return (
        <div>
            <Snackbar
                open={openSnackBar}
                autoHideDuration={6000}
                onClose={handleCloseSnackBar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <StyledAlert onClose={handleCloseSnackBar} severity={'success'}>
                    <AlertTitle>
                        {' '}
                        <strong>{'Success'}</strong>{' '}
                    </AlertTitle>
                    {'You have confirmed payment information. Proceed to Payments'}
                </StyledAlert>
            </Snackbar>
            <button type='button' onClick={handleOpen}>
                Open modal
            </button>

            <StyledModal
                aria-labelledby='review-modal'
                aria-describedby='payment-review'
                open={open}
                onClose={handleClose}
                BackdropComponent={Backdrop}
            >
                <Box sx={style}>
                    <h2 id='review-modal'>Text in a modal</h2>
                    <p id='payment-review'>Aliquid amet deserunt earum!</p>
                    <button onClick={() => setOpenSnackBar(true)}>Open</button>
                    <button onClick={handleClose}>Close</button>
                </Box>
            </StyledModal>
        </div>
    );
}
