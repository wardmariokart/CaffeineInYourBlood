import styles from './../css/dailyCaffeine.module.css';
import { useState, useRef, useEffect } from 'react';
import useRefSize from '../hooks/useRefSize.js';
import AxisTag from './AxisTag.js';

const DailyCaffeine = ({coffees, dailyLimitMg}) => {
    
    // 'Position' is in percentage relative to full bar width
    // 'Value' is the actual mg
    const totalCaffeineMg = coffees.reduce((acc, coffee) => acc + coffee.sizeMl * coffee.caffeineMgPerMl, 0);
    
    const occupiedBarPosition = 0.85;
    const maxPositionLimit = 0.75; 
    const maxPositionTotal = 0.9; 

    const maxValueByLimit = dailyLimitMg * maxPositionLimit; 
    const maxValueByTotal = totalCaffeineMg * maxPositionTotal;
    //const maxValueMg = ((1 - occupiedBarPosition) / occupiedBarPosition + 1) * maxValueByLimit > maxValueByTotal ? daily 
    // todo!!

    const maxValueMg = ((1 - occupiedBarPosition) / occupiedBarPosition + 1) * Math.max(totalCaffeineMg, dailyLimitMg);
    const fillPosition = totalCaffeineMg / maxValueMg;
    const limitPosition = dailyLimitMg / maxValueMg;

    const container = useRef();
    const containerSize = useRefSize(container);
    console.log({containerSize});

    const markIntervalMg = 10;
    const markIntervalPx = markIntervalMg/maxValueMg * containerSize.widthPx;
    console.log({markIntervalPx});
    const bigMarkInteval = 5; // Every 4th mark is big
    let marks = Array(Math.floor(containerSize.widthPx/markIntervalPx) + 1).fill(null);
    marks = marks.map((e, i) => <div key={i} className={i % bigMarkInteval === 0 ? styles.markBig : styles.mark} style={{left: `${markIntervalPx * i}px`}}></div>);
    
    return (
        <section ref={container}>
            <div style={{width: `100%`}}>
            <h2 className={styles.title}>Your daily caffeine intake</h2>
                
                <div className={styles.bar}>  
                    <div className={styles.barFill} style={{width: `${fillPosition*100}%`, height: '100%'}}></div>
                    <div className={styles.barLimit} style={{width: `${limitPosition*100}%`}}></div>
                    <div className={styles.barOutline}></div>
                </div>
                <div className={styles.marks}>
                    {/* {marks} */}
                    <AxisTag 
                        tag={`DAILY LIMIT`} 
                        positionPercent={limitPosition}
                        axisWidthPx={containerSize.widthPx}   
                        bBubble={false}
                    />
                    <AxisTag 
                        tag={`${totalCaffeineMg.toFixed(0)}mg`} 
                        positionPercent={fillPosition}
                        axisWidthPx={containerSize.widthPx}   
                        bBubble={false} 
                    />


                    
                </div>
                <div>
                    
                </div>
            </div>

        </section>
    )
};

DailyCaffeine.defaultProps = {
    coffees: [],
    dailyLimitMg: 250
}

export default DailyCaffeine;