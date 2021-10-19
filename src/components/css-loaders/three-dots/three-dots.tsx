import './styles.css';
import { CSSProperties } from '@material-ui/styles';
import { Box } from '@material-ui/core';
interface Props {
    styles?: CSSProperties;
    className?: string;
}
export const ThreeDots = ({ styles, className }: Props) => {
    console.log(styles);
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
            <div className='lds-ellipsis'>
                <div className={className} style={{ ...styles }}></div>
                <div className={className} style={{ ...styles }}></div>
                <div className={className} style={{ ...styles }}></div>
                <div className={className} style={{ ...styles }}></div>
            </div>
        </Box>
    );
};
