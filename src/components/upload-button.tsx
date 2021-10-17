import { ChangeEvent, ReactElement } from 'react';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Stack from '@mui/material/Stack';

const Input = styled('input')({
    display: 'none'
});

interface UploadButtonProps {
    icon?: ReactElement;
    uploadCallback: (e: ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    type?: 'image' | 'pdf';
    label?: string;
}
export function UploadButton({ icon, className, uploadCallback, label, type = 'image' }: UploadButtonProps) {
    return (
        <Stack direction='row' alignItems='center' spacing={2} className={className}>
            <label htmlFor='icon-button-file'>
                <span>{label}</span>
                <Input accept={`${type}/*`} id='icon-button-file' type='file' onChange={uploadCallback} />
                <IconButton color='primary' aria-label='upload picture' component='span'>
                    {icon ? icon : <CloudUploadIcon sx={{ fontSize: '3rem', color: '#0D324D' }} />}
                </IconButton>
            </label>
        </Stack>
    );
}
