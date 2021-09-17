import { CSSProperties } from '@material-ui/styles'
import { Button, ButtonProps as MuiButtonProps } from '@material-ui/core';


interface CustomButtonProps extends MuiButtonProps {
    text: string
    styles?: object
    className?: string
    onClick?: () => void,
}

const defaultStyles = {
    display: 'block',
    paddingRight: 30,
    paddingLeft: 30,
    height: 50,
    marginTop: 20,
    margin: 'auto',
    fontSize: 16,
    background: '#4990a4',
    textTransform: 'capitalize',
    borderRadius: '10px',
    color: 'white',
    fontWeight: 700,
    boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
    '&:hover': {
        background: '#4990a4',
        opacity: 0.9
    }

} as CSSProperties

const defaultOnclick = () => undefined

export const GenericButton = ({ styles, onClick = defaultOnclick, text, className = '' }: CustomButtonProps) => {
    const allStyles = { ...styles, ...defaultStyles }
    return (
        <Button className={className} style={allStyles} onClick={() => onClick()}>
            {text}
        </Button>
    )
}

