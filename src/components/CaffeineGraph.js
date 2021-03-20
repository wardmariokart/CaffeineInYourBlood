import { useState, useEffect, useRef } from 'react';
import P5Wrapper from 'react-p5-wrapper';
import caffeineSketch from '../sketches/caffeineSketch.js';
import PropTypes from 'prop-types';

const CaffeineGraph = ({scrollableWidthPx, scrollableHeightPx, coffees, pxPerMin, startDate, endDate, mouseGraphPosition, bMouseOnGraph, halfLifeMin}) => {

    return (
            <P5Wrapper sketch={caffeineSketch} 
                width={scrollableWidthPx}
                height={scrollableHeightPx}
                coffees={coffees}
                pxPerMin={pxPerMin}
                startDate={startDate}
                endDate={endDate}
                bMouseOnGraph={bMouseOnGraph}
                mouseGraphPosition={mouseGraphPosition}
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