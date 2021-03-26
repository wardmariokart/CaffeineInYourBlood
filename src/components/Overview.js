import styles from './../css/overview.module.css';
import GraphAxis from './GraphAxis.js';
import Graph from './Graph.js';
import React, { useState, useRef } from 'react';
import { TIME } from '../helpers.js';
import anime from 'animejs/lib/anime.es.js';
import useRefSize from '../hooks/useRefSize.js';

const Overview = ({coffees, selectedCoffee, selectCoffeeById, halfLifeMin}) => {

    /* Resizing and getting a dynamic element size */
    const $overview = useRef();
    const overviewSize = useRefSize($overview);

    let startDate = new Date(Date.now()).setHours(0,0,0,0);
    let endDate = new Date(Date.now()).setHours(24,0,0,0);

    const [graphHoursClean, setGraphHoursClean] = useState(18);
    const [graphHours, setGraphHours] = useState(10);
    endDate = new Date(startDate + TIME.msInHour * graphHours); 

    const pxPerMin = overviewSize.widthPx / (graphHours * TIME.minutesInHour); 

    const [frameStartMs, setFrameStartMs] = useState(3 * TIME.msInHour);

    const frameWidthPx = overviewSize.widthPx;
    const frameTimeMs = endDate - startDate;
    const scrollableOffsetMin = -frameStartMs / TIME.msInMinute;

    const scrollableTimeMs = 36 * TIME.msInHour;

    /* Animate these variables: frameTimeMs (scale), scrollableOffsetMin  */

    const handleSetFrameHours = (targetHours) => {

        return;
        setGraphHoursClean(targetHours);
        return;
        const animeTarget = {graphHours: 5};
        
        anime({
            target: animeTarget,
            graphHours: 24,
            duration: 2000,
            easing: 'linear',
            update: function() {
                setGraphHours(animeTarget.graphHours);
                
              }
        });

    };



    const [scrollPx, setScrollPx] = useState(0);


    return (
        <section className={styles.overview} style={{margin: '0 auto'}} ref={$overview}>

            <Graph
                pxPerMin={pxPerMin}
                scrollableOffsetMin={scrollableOffsetMin}
                scrollableTimeMs={scrollableTimeMs}
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
                scrollableTimeMs={scrollableTimeMs}
                frameWidthPx={frameWidthPx}
                frameTimeMs={frameTimeMs}
                startDate={startDate}
            />

           {/*  <div className={styles.sideDiv}>
                <span>Hours on graph: {graphHoursClean}</span>
                <input type='range' min={1} max={24} width={300} value={graphHoursClean} onChange={e => handleSetFrameHours(parseInt(e.currentTarget.value))}></input>

                <span>Hour offset: {frameStartMs/TIME.msInHour}</span>
                <input type='range' min={-12} max={12} step={0.5} value={frameStartMs/TIME.msInHour} onChange={e => setFrameStartMs(e.currentTarget.value * TIME.msInHour)}></input>
            </div> */}

        </section>
    );
}



export default Overview;