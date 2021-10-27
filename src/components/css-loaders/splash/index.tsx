import { CSSProperties } from '@material-ui/styles';
import { Box } from '@material-ui/core';

import './splash.css';
interface Props {
    styles?: CSSProperties;
    className?: string;
}

const Splash = ({ styles, className }: Props) => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                width: '100%'
            }}
        >
            <div className='lds-ripple'>
                <div className={className} style={styles}></div>
                <div className={className} style={styles}></div>
            </div>
        </Box>
    );
};

export default Splash;
