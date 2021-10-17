import { memo } from 'react';
import { Grid } from '@material-ui/core';

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
                        <img src={file} alt={'kyc-files'} />;
                    </Grid>
                );
            })}
        </Grid>
    );
});
