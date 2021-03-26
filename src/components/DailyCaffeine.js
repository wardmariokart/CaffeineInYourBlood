import styles from './../css/dailyCaffeine.module.css';
import { useRef } from 'react';
import useRefSize from '../hooks/useRefSize.js';
import AxisTag from './AxisTag.js';

const DailyCaffeine = ({coffees, dailyLimitMg, maxFillPercentage}) => {
    
    // 'Position' is in percentage relative to full bar width
    // 'Value' is the actual mg
    const totalCaffeineMg = coffees.reduce((acc, coffee) => acc + coffee.sizeMl * coffee.caffeineMgPerMl, 0);
    
    const maxValueMg = ((1 - maxFillPercentage) / maxFillPercentage + 1) * Math.max(totalCaffeineMg, dailyLimitMg);
    const fillPosition = totalCaffeineMg / maxValueMg;
    const limitPosition = dailyLimitMg / maxValueMg;

    const container = useRef();
    const containerSize = useRefSize(container);

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
    dailyLimitMg: 250,
    maxFillPercentage: 0.85
}

export default DailyCaffeine;