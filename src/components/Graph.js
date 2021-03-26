import { useState, useRef, useLayoutEffect } from 'react';
import styles from '../css/graph.module.css';
import { TIME } from '../helpers/helpers';
import CaffeineGraph from './CaffeineGraph.js';


const Graph = ({pxPerMin, setScrollPx, scrollPx, scrollableOffsetMin, scrollableTimeMs, coffees, selectedCoffee, selectCoffeeById, startDate, endDate, halfLifeMin}) => {

    const frame = useRef();
    const [mouseCanvasPosition, setMouseCanvasPosition] = useState({x: 0, y: 0});
    const [bMouseOnCanvas, setBMouseOnCanvas] = useState(false);

    const scrollableWidthPx = scrollableTimeMs / TIME.msInMinute * pxPerMin;
    
    const handleScroll = (e) => {
        const updated = e.currentTarget.scrollLeft; 
        setMouseCanvasPosition({...mouseCanvasPosition, x: mouseCanvasPosition.x + updated - scrollPx});
        setScrollPx(updated);
    }

    const handleMouseOver = e => {
        const graphRect = e.currentTarget.getBoundingClientRect();
        const graphVWPosition= {x: graphRect.left, y: graphRect.top}; // VW = view space
        const clone = {x: e.clientX - graphVWPosition.x + scrollPx, y: e.clientY - graphVWPosition.y};
        setMouseCanvasPosition(clone);
    }

    useLayoutEffect(() => {
        if (frame.current){
            frame.current.scrollRight = 300;
            console.log('setScroll');
        }
    }, [frame])



    return (
        <div 
            className={styles.frame}
            ref={frame}
            onScroll={handleScroll}
            onMouseMove={handleMouseOver}
            onMouseEnter={() => setBMouseOnCanvas(true)}
            onMouseLeave={() => setBMouseOnCanvas(false)}>
            <CaffeineGraph 
                className={styles.scrollable} 
                style={{left: `${scrollableOffsetMin * pxPerMin}px`}}
                scrollableWidthPx={scrollableWidthPx}
                scrollableHeightPx={250}    
                coffees={coffees}
                selectedCoffeeId={selectedCoffee ? selectedCoffee.id : null}
                selectCoffeeById={selectCoffeeById}
                pxPerMin={pxPerMin}
                startDate={startDate}
                endDate={endDate}
                mouseCanvasPosition={mouseCanvasPosition}
                bMouseOnCanvas={bMouseOnCanvas}
                halfLifeMin={halfLifeMin}
            >
            </CaffeineGraph> 
        </div>
    );
}

export default Graph;
