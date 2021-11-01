import { useState } from "react"

export default ({ children,onClick, disabled}: any) => {

    const [hover, setHover] = useState(false)

    return (<>
        <button disabled={disabled} onClick={onClick} onMouseEnter={()=>{
            setHover(true)
        }} onMouseLeave={()=>{
            setHover(false)
        }} style={hover ? styles.hover : (!disabled ? styles.button : styles.disabled)}>
            {children}
        </button>
    </>)
}

const styles = {
    button: {
        backgroundColor: '#55f',
        color: '#fff',
        borderRadius: 5,
        margin: 10,
        marginBottom: 'auto',
        fontSize: 16,
        padding: 10,
        border: '0 solid',
        width: 'fit-content'
    },
    hover: {
        backgroundColor: '#55f',
        color: '#fff',
        borderRadius: 5,
        margin: 10,
        marginBottom: 'auto',
        fontSize: 16,
        padding: 10,
        border: '0 solid',
        cursor: 'pointer',
        transform: 'scale(1.01)',
        width: 'fit-content'
    },
    disabled: {
        backgroundColor: '#555',
        color: '#fff',
        borderRadius: 5,
        margin: 10,
        marginBottom: 'auto',
        fontSize: 16,
        padding: 10,
        border: '0 solid',
        width: 'fit-content'
    }
}