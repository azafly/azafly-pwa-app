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
                maxWidth: 900,
                margin: 'auto',
                borderRadius: 3,
                flexWrap: 'wrap',
                padding: 10,
                border: '1px solid ',
                cursor: 'pointer',
                width: '90vw',
                marginTop: '2vh',
                background: '#FFEBE9'
            }}
            onClick={handleSendVerificationEmail}
        >
            <Box fontWeight={500}>{emailLink}</Box>
        </Box>
    );
});
