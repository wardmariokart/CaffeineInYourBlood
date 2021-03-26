import P5Wrapper from 'react-p5-wrapper';
import caffeineSketch from '../sketches/caffeineSketch.js';
import PropTypes from 'prop-types';

const CaffeineGraph = ({scrollableWidthPx, scrollableHeightPx, coffees, selectedCoffeeId, selectCoffeeById, pxPerMin, startDate, endDate, mouseCanvasPosition, bMouseOnCanvas, halfLifeMin}) => {

    return (
            <P5Wrapper sketch={caffeineSketch} 
                width={scrollableWidthPx}
                height={scrollableHeightPx}
                coffees={coffees}
                selectedCoffeeId={selectedCoffeeId}
                selectCoffeeById={selectCoffeeById}
                pxPerMin={pxPerMin}
                startDate={startDate}
                endDate={endDate}
                bMouseOnCanvas={bMouseOnCanvas}
                mouseCanvasPosition={mouseCanvasPosition}
                halfLifeMin={halfLifeMin}
                >
            </P5Wrapper>
    ); 
}

CaffeineGraph.propTypes = {
    coffees: PropTypes.array.isRequired,
    scrollableWidthPx: PropTypes.number.isRequired,
    scrollableHeightPx: PropTypes.number.isRequired
}



export default CaffeineGraph;