import styles from '../css/graph.module.css';
import { TIME } from '../helpers';

const Graph = ({coffees, selectedCoffee, graphTimeMs, graphWidthPx}) => {
    
    const dateToPositionPx = (date, graphWidthPx, graphTimeMs) => {
        const pxPerMinute = graphWidthPx / (graphTimeMs / TIME.msInMinute);        
        const dateInMinutes = date.getHours() * TIME.minutesInHour + date.getMinutes();
        return pxPerMinute * dateInMinutes;
    };

    const tmp = new Array(10).fill(null);
    const coffeeBubbles = tmp.map((coffee, id) => {const d = new Date(); d.setHours(id * 2 + id % 3, (id % 3) * 15,0,24); return <div key={id} className={styles.coffee} style={{left: `${dateToPositionPx(d, graphWidthPx, graphTimeMs)}px`}}></div>});




    return (
        <div className={styles.graph}>
            {coffeeBubbles}
        </div>
    );
}

export default Graph;
