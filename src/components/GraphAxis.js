import styles from '../css/graphAxis.module.css';
import { msToMin, minToMs, leadingZeros } from '../helpers.js';

const GraphAxis = ({startDate, endDate, graphWidthPx}) => {

    const minutesPerMark = 15;
    const bigMarkInterval = 4; // 1 big mark for every nth mark
    const markClass = styles.mark;
    const bigMarkClass = styles.bigMark;
    
    const graphMs = endDate - startDate;
    const graphMinutes = msToMin(graphMs, true);
    const nbMarks = Math.floor(graphMinutes / minutesPerMark) + 1; 
    const pxPerMark = graphWidthPx / (nbMarks - 1);
    
    const getMarkInlineCss = (i) => {return{left: `${i * pxPerMark}px`}};
    const createBigMark = (i) => {
        const time = new Date(startDate + minToMs(i * minutesPerMark));

        return (
            <div className={bigMarkClass} style={getMarkInlineCss(i)} key={i}>
            <span className={styles.markLabel}>
                {leadingZeros(time.getHours(), 2)}:{leadingZeros(time.getMinutes(), 2)}
            </span>
        </div>
    )};

    const createSmallMark = (i) => <div className={markClass} style={getMarkInlineCss(i)} key={i}></div>;
    
    let marks = new Array(nbMarks).fill(null);
    marks = marks.map((e, i) => i % bigMarkInterval ? createSmallMark(i) : createBigMark(i));


    return <div className={styles.axis}>
        {marks}
    </div>
}

export default GraphAxis;