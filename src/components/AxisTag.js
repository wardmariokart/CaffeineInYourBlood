import styles from '../css/axisTag.module.css';
import { useLayoutEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

const AxisTag = ({tag, positionPercent, axisWidthPx, bBubble}) => {
    
    const element = useRef(null);
    const [width, setWidth] = useState(0);
    useLayoutEffect(() => {
        setWidth(element.current.offsetWidth ?? 0);
    }, [element])
    
    const style = {left: `${axisWidthPx * positionPercent - width / 2}px` }

    return (
        <div className={`${styles.tag} ${bBubble ? styles.tagBubble : ''}`} ref={element} style={style}>
            {tag}
        </div>
    );
}

AxisTag.defaultProps = {
    bBubble: false
}

export default AxisTag;