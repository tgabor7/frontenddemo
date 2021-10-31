import { useState } from 'react';
import {useSpring, animated} from 'react-spring'
import Button from './Button';

export default ({onClick,children,selected} : any)=>{

    const props = useSpring({
        transform: selected ? 'scale(1.1)' : 'scale(1.0)'
    })

    return (<>
        <animated.div style={{transform: props.transform, margin: 'auto'}}>
                <Button onClick={onClick}>
                {children}</Button>
            </animated.div>
    </>)
}