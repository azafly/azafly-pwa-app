import Snackbar from '@mui/material/Snackbar';
import { SnackbarOrigin } from '@mui/material/Snackbar';
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
    position?: SnackbarOrigin;
}

const defaultPosition: SnackbarOrigin = { vertical: 'top', horizontal: 'center' };
export const DefaultSnackbar = ({
    autoHideDuration = 3000,
    open,
    handleClose,
    title,
    severity,
    info,
    className,
    position = defaultPosition
}: SnackBarProps) => {
    return (
        <Snackbar className={className} open={open} autoHideDuration={autoHideDuration} onClose={handleClose} anchorOrigin={position}>
            <StyledAlert onClose={handleClose} severity={severity} sx={{}} style={{ width: 'max-content', maxWidth: 800 }}>
                <AlertTitle>
                    {' '}
                    <strong>{title}</strong>
                </AlertTitle>
                {info}
            </StyledAlert>
        </Snackbar>
    );
};
