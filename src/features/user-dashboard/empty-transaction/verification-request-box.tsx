import { ReactNode, memo } from 'react';
import { Box } from '@material-ui/core';

interface VerificationRequestBoxProps {
    handleSendVerificationEmail: () => void;
    emailLink: ReactNode;
}

export const VerificationRequestBox = memo(function VerificationRequestBox({ emailLink, handleSendVerificationEmail }: VerificationRequestBoxProps) {
    return (
        <Box
            style={{
                display: 'flex',
                justifyContent: 'center',
                marginRight: 10,
                marginLeft: 10,
                maxWidth: 1200,
                margin: 'auto',
                borderRadius: 3,
                flexWrap: 'wrap',
                padding: 10,
                fontSize: '0.8rem',
                border: '1px solid ',
                cursor: 'pointer',
                background: '#FFEBE9',
                marginBottom: 30
            }}
            onClick={handleSendVerificationEmail}
        >
            {emailLink}
        </Box>
    );
});
