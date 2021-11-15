import { Grid } from '@material-ui/core';
import { memo } from 'react';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

interface FilesContainerProps {
    files: string[];
    className: string;
}

export const FilesContainer = memo(function FilesContainer({ files, className }: FilesContainerProps) {
    return (
        <Grid container className={`${className}`} spacing={3}>
            {files?.map((file: string) => {
                return (
                    <Grid key={file} item xs={12} md={6}>
                        <a href={file} target='_blank' rel='noopener noreferrer'>
                            {' '}
                            Identity Document <OpenInNewIcon />{' '}
                        </a>
                    </Grid>
                );
            })}
        </Grid>
    );
});
