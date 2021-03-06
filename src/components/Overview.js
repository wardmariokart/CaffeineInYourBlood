import styles from './../css/overview.module.css';
import GraphAxis from './GraphAxis.js';
import Graph from './Graph.js';
import React, { useState, useEffect } from 'react';
import { TIME } from '../helpers.js';
import sizeMe from 'react-sizeme';
const Overview = ({coffees, selectedCoffee, selectCoffeeById, startDate, endDate, size}) => {
    
    

    let graphWidthPx = size.width;
    const [graphHours, setGraphHours] = useState(36);
    endDate = new Date(startDate + TIME.msInHour * graphHours); 

    useEffect(() => { /* Question: Is het ind deze situatie oke om queryselector te gebruiken? */
        const $graph = document.querySelector('#overview');
        $graph.addEventListener('mousemove', (event) => console.log('hit'));
    });

    return (
        <section className={styles.overview} style={{margin: '0 auto'}} id='overview'>
            <Graph
                coffees={coffees}
                selectedCoffee={selectedCoffee}
                graphWidthPx={graphWidthPx}
                graphTimeMs={endDate - startDate}
            />
            <GraphAxis
                startDate={startDate}
                endDate={endDate}
                graphWidthPx={graphWidthPx}
            />
            <div className={styles.sideDiv}>
                <span>Hours on graph: {graphHours}</span>
                <input type='range' min={1} max={24} width={300} value={graphHours} onChange={e => setGraphHours(e.currentTarget.value)}>

                </input>
            </div>
{/* 
            <ul> {coffees.filter(filter => !filter.bInCreation).map(coffee => (
                <li key={coffee.id} onClick={() => selectCoffeeById(coffee.id)}>
                    {coffee.id === (selectedCoffee && selectedCoffee.id) ? <b>{coffee.name}({coffee.sizeMl}ml)</b> : <>{coffee.name}({coffee.sizeMl}ml)</>}
                </li>))}
            </ul> */}
        </section>
    );
}

Overview.defaultProps = {
    startDate: new Date(Date.now()).setHours(0,0,0,0),
    endDate: new Date(Date.now()).setHours(24,0,0,0)
}

export default sizeMe()(Overview);