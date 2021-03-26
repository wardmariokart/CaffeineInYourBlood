import styles from '../css/graphAxis.module.css';
import { mapRange, clamp, minToMs, leadingZeros, TIME} from '../helpers.js';
import { easeInExpo, easeOutQuad, easeOutBack } from '../helpers/easingHelpers.js';

const GraphAxis = ({scrollPx, scrollableTimeMs, frameTimeMs, frameWidthPx, startDate}) => {

    const minutesPerMark = 5;
    const bigMarkInterval = 12; // 1 big mark for every nth mark
    const markClass = styles.mark;
    const bigMarkClass = styles.bigMark;
    
    const pxPerMin = frameWidthPx / (frameTimeMs / TIME.msInMinute);
    const nbMarks = Math.floor(scrollableTimeMs / TIME.msInMinute / minutesPerMark) + 1;
    const pxPerMark = minutesPerMark * pxPerMin;
    

    const positionToPercent = (position, range) => clamp(mapRange(0, range, 0, 1, .5 - Math.abs(.5 - position)), 0, 1)

    const getMarkInlineCss = (i) => {
        const {local, world} = getMarkLocation(i);

        let wPosPercent = world / frameWidthPx; // 0 = most left. 1 = most right
        wPosPercent = isNaN(wPosPercent) ? 0 : wPosPercent; 
        
        const scaleStartPosition = 0.1;
        const scalePercent = positionToPercent(wPosPercent, scaleStartPosition);
        const scale = easeOutBack(scalePercent);//easeOutBack(scalePercent);

        const opacityStartPosition = 0.05;
        const opacityPercent = positionToPercent(wPosPercent, opacityStartPosition);
        const opacity = easeOutQuad(opacityPercent);

        const style = {left: `${local}px`,
            transform: `scale(${scale}) translateY(${(1-opacity) * -10}px)`,
            transformOrigin: 'top center',
            opacity
        };
        style.opacity = opacity; 

        return style;
    };

    const getMarkLocation = (i) => {
        const local = i * pxPerMark;
        const world = local - scrollPx;
        return {local, world}
    }

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

    return (
    <div className={styles.frame}>
        <div className={styles.scrollable} style={{left: `${-scrollPx}px`}}>
            {marks}
        </div>
    </div>);
}

export default GraphAxis;