import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useDispatch, useSelector } from 'react-redux';

import { Dispatch, RootState } from 'app/store';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
};

interface VirtualCardModal {
    openModal: boolean;
    handleClose: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function BasicModal({ children, openModal, handleClose }: React.PropsWithChildren<VirtualCardModal>) {
    const dispatch = useDispatch<Dispatch>();
    const {
        dashboard: {
            currentVirtualCard: { currency }
        }
    } = useSelector(({ dashboard }: RootState) => ({ dashboard }));

    return (
        <Modal
            onBackdropClick={() => dispatch.dashboard.setCurrentCardIdentifier({ currency, openTopUpModal: false })}
            open={openModal}
            onClose={handleClose}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
        >
            <Box sx={style}>{children}</Box>
        </Modal>
    );
}
