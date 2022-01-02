import { ChangeEvent, ReactElement } from 'react';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Stack from '@mui/material/Stack';
import { ThreeDots } from './css-loaders/three-dots';

const Input = styled('input')({
    display: 'none'
});

interface UploadButtonProps {
    icon?: ReactElement;
    uploadCallback: (e: ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    label?: string;
    loading?: boolean;
}
export function UploadButton({ icon, className, uploadCallback, label, loading }: UploadButtonProps) {
    const type = `image/*,application/pdf`;
    const ICON = icon ? icon : <CloudUploadIcon sx={{ fontSize: '3rem', color: '#0D324D' }} />;
    return (
        <Stack direction='row' alignItems='center' spacing={2} className={className} style={{ cursor: 'pointer' }}>
            <label htmlFor='icon-button-file'>
                <span style={{ fontSize: '0.95rem' }}>{label}</span>
                <Input accept={type} id='icon-button-file' type='file' onChange={uploadCallback} />
                {loading ? (
                    <ThreeDots variantColor={'base'} />
                ) : (
                    <IconButton color='primary' aria-label='upload picture' component='span'>
                        {ICON}
                    </IconButton>
                )}
            </label>
        </Stack>
    );
}
