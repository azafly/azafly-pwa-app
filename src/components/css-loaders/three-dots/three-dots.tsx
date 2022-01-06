import './styles.css';
import { CSSProperties } from '@material-ui/styles';
import { Stack } from '@mui/material';
interface Props {
    styles?: CSSProperties;
    className?: string;
    variantColor?: 'base' | 'white'; // loading indeciator is base or white,
    loadingText?: string;
    textPosition?: 'start' | 'end';
}
export const ThreeDots = ({ styles, className, variantColor, loadingText, textPosition = 'start' }: Props) => {
    const updatedStyles = {
        ...styles,
        backgroundColor: variantColor === 'base' ? '#4990A4' : 'white'
    };
    return (
        <Stack
            direction={'row'}
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%'
            }}
        >
            {' '}
            {textPosition === 'start' && <div style={{ fontFamily: 'Nunito', fontWeight: 600 }}> {loadingText} </div>}
            <div className='lds-ellipsis'>
                <div className={className} style={updatedStyles}></div>
                <div className={className} style={updatedStyles}></div>
                <div className={className} style={updatedStyles}></div>
                <div className={className} style={updatedStyles}></div>
            </div>
            {textPosition === 'end' && <div style={{ fontFamily: 'Nunito', fontWeight: 600 }}> {loadingText} </div>}
        </Stack>
    );
};
