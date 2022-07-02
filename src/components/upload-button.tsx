import { ChangeEvent, ReactElement } from 'react';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { ThreeDots } from './css-loaders/three-dots';
import { Button } from '@material-ui/core';

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
export function UploadButton({ icon, uploadCallback, label, loading }: UploadButtonProps) {
    const type = `image/*,application/pdf`;
    const ICON = icon ? icon : <CloudUploadIcon sx={{ fontSize: '2rem', color: 'white' }} />;
    return (
        <Button
            variant={'contained'}
            color={'primary'}
            size={'small'}
            style={{ textTransform: 'capitalize', width: 'max-content', cursor: 'pointer', color: 'white', height: '40px' }}
            fullWidth
        >
            <label htmlFor='icon-button-file' style={{ cursor: 'pointer' }}>
                <span style={{ fontSize: '0.95rem' }}>{label}</span>
                <Input accept={type} id='icon-button-file' type='file' onChange={uploadCallback} />
                {loading ? (
                    <ThreeDots variantColor={'base'} />
                ) : (
                    <IconButton aria-label='upload picture' component='span' style={{ color: 'white' }}>
                        {ICON}
                    </IconButton>
                )}
            </label>
        </Button>
    );
}
