import { useState } from 'react';
import styles from '../css/graph.module.css';
import { TIME } from '../helpers';
import GraphP5 from './GraphP5.js';
import CaffeineGraph from './CaffeineGraph.js';


const Graph = ({pxPerMin, setScrollPx, scrollPx, scrollableOffsetMin, scrollableTimeMs, coffees, selectedCoffee, selectCoffeeById, frameWidthPx, startDate, endDate, halfLifeMin}) => {



    const [mouseGraphPosition, setMouseGraphPosition] = useState({x: 0, y: 0});
    const [bMouseOnGraph, setBMouseOnGraph] = useState(false);

    const scrollableWidthPx = scrollableTimeMs / TIME.msInMinute * pxPerMin;

    const dateToPositionPx = (date) => {
        const positionMinutes = date.getHours() * TIME.minutesInHour + date.getMinutes();
        const out = pxPerMin * positionMinutes;
        return out;
    };


/*     const coffeeBubbles = coffees.map((coffee, id) => {
        const d = new Date(); 
        d.setHours(coffee.hour, coffee.minute,0,0);
        const bSelected = coffee.id === selectedCoffee.id;    
        return <div 
            key={id} 
            className={`${styles.bubble} ${bSelected ? styles.bubbleSelected : ''}`} 
            style={{left: `${dateToPositionPx(d)}px`}}
            onClick={() => selectCoffeeById(coffee.id)}>

            </div>
    }); */

    
    const handleScroll = (e) => {
        const updated = e.currentTarget.scrollLeft; 
        setMouseGraphPosition({...mouseGraphPosition, x: mouseGraphPosition.x + updated - scrollPx});
        setScrollPx(updated);
    }

    const handleMouseOver = e => {

        const graphRect = e.currentTarget.getBoundingClientRect();
        const graphVWPosition= {x: graphRect.left, y: graphRect.top}; // VW = view space
        const clone = {x: e.clientX - graphVWPosition.x + scrollPx, y: e.clientY - graphVWPosition.y};
        setMouseGraphPosition(clone);
    }

    return (
        <div 
            className={styles.frame}
            onScroll={handleScroll}
            onMouseMove={handleMouseOver}
            onMouseEnter={() => {console.log('enter event'); setBMouseOnGraph(true)}}
            onMouseLeave={() => setBMouseOnGraph(false)}>
            <CaffeineGraph 
                className={styles.scrollable} 
                style={{left: `${scrollableOffsetMin * pxPerMin}px`}}
                scrollableWidthPx={scrollableWidthPx}
                scrollableHeightPx={320}    
                coffees={coffees}
                pxPerMin={pxPerMin}
                startDate={startDate}
                endDate={endDate}
                mouseGraphPosition={mouseGraphPosition}
                bMouseOnGraph={bMouseOnGraph}
                halfLifeMin={halfLifeMin}
            >
            </CaffeineGraph> 
        </div>
    );
}



export default Graph;
