import Snackbar from '@mui/material/Snackbar';
import { styled } from '@mui/system';
import { Alert, AlertTitle } from '@material-ui/lab';

const StyledAlert = styled(Alert)`
        margin: 15;
        overflowWrap: 'break-word;
`;

interface SnackBarProps {
    open: boolean;
    handleOpen?: () => void;
    handleClose: () => void;
    title: string;
    severity: 'error' | 'success';
    info: string;
    autoHideDuration?: number;
    className?: string;
}
export const DefaultSnackbar = ({ autoHideDuration = 3000, open, handleClose, title, severity, info, className }: SnackBarProps) => {
    return (
        <Snackbar
            className={className}
            open={open}
            sx={{ width: '92vw', maxWidth: 1200 }}
            autoHideDuration={autoHideDuration}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
            <StyledAlert onClose={handleClose} severity={severity}>
                <AlertTitle>
                    {' '}
                    <strong>{title}</strong>
                </AlertTitle>
                {info}
            </StyledAlert>
        </Snackbar>
    );
};
