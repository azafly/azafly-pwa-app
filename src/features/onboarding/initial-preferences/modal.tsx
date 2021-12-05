import * as React from 'react';

import { styled, Box } from '@mui/system';
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ModalUnstyled from '@mui/core/ModalUnstyled';

const style = {
    width: 400,
    bgcolor: 'white',
    borderRadius: 2,
    margin: 'auto',
    p: 2,
    px: 4,
    pb: 3
};

export default function ModalContent() {
    const history = useHistory();

    const goTDashboard = async () => {
        history.push('/dashboard');
    };

    return (
        <Box sx={{ width: '100vw', display: 'flex', alignItems: 'center' }}>
            <Box sx={style} style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                <h3 style={{ textAlign: 'center' }} id='verify-modal'>
                    {'We are now reviewing your ID document'}
                </h3>
                <CheckCircleOutlineIcon style={{ fontSize: 50 }} color={'success'} />

                <p style={{ textAlign: 'center' }} id='payment-verify'>
                    {'We will get back to you withing 24hrs. If you have any questions, contact Support through the chat bubble below or email '}
                    <strong>{'support@azafly.com'}</strong>
                </p>

                <Box sx={{ margin: 1 }}>
                    <Button variant={'contained'} onClick={goTDashboard} color={'success'}>
                        {'Go to dashboard'}
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}

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

interface ModalProps {
    open: boolean;
    handleClose: () => void;
}
export function Modal({ open, handleClose }: ModalProps) {
    return (
        <div>
            <StyledModal
                aria-labelledby='review-modal'
                aria-describedby='payment-review'
                open={open}
                onClose={handleClose}
                BackdropComponent={Backdrop}
            >
                <ModalContent />
            </StyledModal>
        </div>
    );
}
