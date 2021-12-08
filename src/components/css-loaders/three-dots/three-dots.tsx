import './styles.css';
import { CSSProperties } from '@material-ui/styles';
import { Box } from '@material-ui/core';
interface Props {
    styles?: CSSProperties;
    className?: string;
    variantColor?: 'base' | 'white'; // loading indeciator is base or white
}
export const ThreeDots = ({ styles, className, variantColor }: Props) => {
    const updatedStyles = {
        ...styles,
        backgroundColor: variantColor === 'base' ? '#4990A4' : 'white'
    };
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%'
            }}
        >
            <div className='lds-ellipsis'>
                <div className={className} style={updatedStyles}></div>
                <div className={className} style={updatedStyles}></div>
                <div className={className} style={updatedStyles}></div>
                <div className={className} style={updatedStyles}></div>
            </div>
        </Box>
    );
};
