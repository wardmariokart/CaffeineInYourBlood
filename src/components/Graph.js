import { useState } from 'react';
import styles from '../css/graph.module.css';
import { TIME } from '../helpers';
import GraphP5 from './GraphP5.js';
import CaffeineGraph from './CaffeineGraph.js';


const Graph = ({pxPerMin, setScrollPx, scrollPx, scrollableOffsetMin, scrollableTimeMs, coffees, selectedCoffee, selectCoffeeById, frameWidthPx, startDate, endDate, halfLifeMin}) => {

    const [mouseCanvasPosition, setMouseCanvasPosition] = useState({x: 0, y: 0});
    const [bMouseOnCanvas, setBMouseOnCanvas] = useState(false);

    const scrollableWidthPx = scrollableTimeMs / TIME.msInMinute * pxPerMin;

    const dateToPositionPx = (date) => {
        const positionMinutes = date.getHours() * TIME.minutesInHour + date.getMinutes();
        const out = pxPerMin * positionMinutes;
        return out;
    };
    
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

    return (
        <div 
            className={styles.frame}
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
