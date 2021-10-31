import { useState } from "react"
import { styles } from "../App"
import ErrorModal from "./ErrorModal"

export default ({ style, label, value, setValue }: any) => {


    return (<>
        <div style={{ ...page_styles.container, ...style }}>
            <p style={styles.p}>{label}</p>
            <input style={page_styles.input} value={value} onBlur={()=>{
                if(!parseFloat(value)) setValue(1)
            }} onChange={(e:any)=>{setValue(e.target.value)}} type="number"></input>
        </div>
    </>)
}

const page_styles = {
    container: {
        display: 'flex',
        width: 'fit-content',
        maxWidth: 200,
        height: 60,
        backgroundColor: '#222',
        border: '1px solid white',
        margin: 10,
    },
    input: {
        fontSize: 24,
        display: 'flex',
        width: 100,
        marginRight: 'auto',
        padding: 5,
        backgroundColor: "#fff",
        border: '1px solid black'
    }
}