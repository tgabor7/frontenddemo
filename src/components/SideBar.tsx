import React, { useState } from "react"
import { Container } from "react-bootstrap"
import Button from './Button'
import { useSpring, animated } from 'react-spring'
import AnimatedButton from "./AnimatedButton"

export default ({ style, setPage }: any) => {

    const [selected, setSelected] = useState(0)

    return (<>
        <div style={{ ...styles.container, ...style }}>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                flexWrap: 'wrap',
            }}>
                <AnimatedButton selected={selected === 0} onClick={() => {
                    setPage(0)
                    setSelected(0)
                }}>Kezdeti adatok generálása</AnimatedButton>
                <AnimatedButton selected={selected === 1} onClick={() => {
                    setPage(1)
                    setSelected(1)
                }}>Eredmény</AnimatedButton>
            </div>
        </div>
    </>)
}
const styles = {
    container: {
        width: '20vw',
        height: '100vh',
        backgroundColor: '#222'
    },
    hoverButton: {

    }
}