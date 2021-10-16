import './styles.css';
import { CSSProperties } from '@material-ui/styles';
interface Props {
    style?: CSSProperties;
}
export const ThreeDots = ({ style }: Props) => {
    return (
        <div className='lds-ellipsis'>
            <div style={style}></div>
            <div style={style}></div>
            <div style={style}></div>
            <div style={style}></div>
        </div>
    );
};
