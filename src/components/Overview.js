import styles from './../css/overview.module.css';
import GraphAxis from './GraphAxis.js';
import Graph from './Graph.js';
import React, { useState, useRef } from 'react';
import { TIME } from '../helpers/helpers.js';
import useRefSize from '../hooks/useRefSize.js';

const Overview = ({coffees, selectedCoffee, selectCoffeeById, halfLifeMin, visibleHours, scrollableHours}) => {

    /* Resizing and getting a dynamic element size */
    const $overview = useRef();
    const overviewSize = useRefSize($overview);

    let startDate = new Date(Date.now()).setHours(3,0,0,0);
    const endDate = new Date(startDate + TIME.msInHour * visibleHours); 

    const pxPerMin = overviewSize.widthPx / (visibleHours * TIME.minutesInHour); 

    const frameStartMs = 3 * TIME.msInHour;

    const frameWidthPx = overviewSize.widthPx;
    const frameTimeMs = endDate - startDate;
    const scrollableOffsetMin = -frameStartMs / TIME.msInMinute;

    const [scrollPx, setScrollPx] = useState(0);

    return (
        <section className={styles.overview} style={{margin: '0 auto'}} ref={$overview}>

            <Graph
                pxPerMin={pxPerMin}
                scrollableOffsetMin={scrollableOffsetMin}
                scrollableTimeMs={scrollableHours * TIME.msInHour}
                setScrollPx={setScrollPx} 
                scrollPx={scrollPx}
                coffees={coffees}
                selectedCoffee={selectedCoffee}
                selectCoffeeById={selectCoffeeById}
                frameWidthPx={overviewSize.widthPx}
                startDate={startDate}
                endDate={endDate}
                halfLifeMin={halfLifeMin}
            />
            <GraphAxis
                scrollPx={scrollPx}
                scrollableTimeMs={scrollableHours * TIME.msInHour}
                frameWidthPx={frameWidthPx}
                frameTimeMs={frameTimeMs}
                startDate={startDate}
            />
        </section>
    );
}

Overview.defaultProps = {
    scrollableHours: 30,
    visibleHours: 14
}

export default Overview;