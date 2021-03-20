import { useState, useRef, useLayoutEffect, useEffect } from 'react';
import PropTypes from 'prop-types';
import p5 from 'p5';
import styles from '../css/graphP5.module.css';

const GraphP5 = ({pxPerMin, width, height}) => {

    console.log(`in width: ${width}`);

    
    
    const draw = (sketch) => {
        if (!('state' in sketch)) return;
        sketch.background(102);
        
        sketch.colorMode(sketch.RGB, 255);

        const c1 = sketch.color(255,0,0);
        const c2 = sketch.color(0,255,255);
        setGradient(sketch, 0, 0, width, height, c1, c2);
        //console.log(`draw: w${sketch.width} h${sketch.height}`);
    }

    const setGradient = (sketch, x, y, w, h, c1, c2) => {
        sketch.noFill();
        // Left to right gradient
        for (let i = x; i <= x + w; i++) {
            let inter = sketch.map(i, x, x + w, 0, 1);
            let c = sketch.lerpColor(c1, c2, inter);
            sketch.stroke(c);
            sketch.line(i, y, i, y + h);
        }
    };

    

    const $sketch = useRef(null);
    const [p5Instance, setP5Instance] = useState(null);
    const [canvasId, setCanvasId] = useState(0);

    useLayoutEffect(() => {

        const s = sketch => {
            //setSketchState(sketch);
            console.log(`s: Create p5 canvas`);
            sketch.setup = () => {
                sketch.createCanvas(0, 0);
                //sketch.noLoop();
                
            };
    
            sketch.draw = () => draw(sketch);
        };

        const canvas = new p5(s, $sketch.current);
        canvas.resizeCanvas(width, height);
        canvas.state = {width, height, canvasId};
        console.log({width,height,canvasId});
        setCanvasId( canvasId + 1);

        return () => { setTimeout(() =>{console.log('removing canvas with id: ' + canvas.state.canvasId); canvas.remove();}, 1000 ) }
    }, [width])

    const updateCanvasSize = () => {
        p5Instance.resizeCanvas(width, height);
        console.log(`p5 canvas is now ${width}px wide and ${height} high`);
    }

    // if pxPerMin changes, update the sketch width
    useEffect(() => {
        return;
        if (p5Instance) {
            updateCanvasSize();
            console.log('hit');

        }
    }, [pxPerMin, p5Instance, width , height]);


    const ensureCanvasDimensions = () => {
        
        if (p5Instance) {
            const canvasWidth = p5Instance.width;
            const canvasHeight = p5Instance.height;
            
            console.log(`canvas w${canvasWidth} --- target w${width}`);

            if (canvasWidth !== width || canvasHeight !== height) {
                updateCanvasSize();
            }
        }
    };

    ensureCanvasDimensions();

    if (p5Instance) {
        p5Instance.draw = () => draw(p5Instance);
        console.log({p5Instance});
    }

    //console.log(`Canvas: w${width}, h${height}`)
    
   // const width = $sketch.current ? $sketch.current.scrollWidth : 0;
    //const height = $sketch.current ? $sketch.current.scrollHeight : 0;

   

  
    

    //const colors = [new p5.Color(204,120,8), new p5.Color(42,244,111)];
    //const [colorId, setColorId] = useState(0);

    /* useLayoutEffect is similair to useEffect with the differnce that ule will be called before the render call, while ue is called after render. */
    /* When to use ule: Measurements, dom related stuff */
    /* When to use ue: Everything else */
    return (
    <div
        ref={$sketch}
        className={styles.graphP5}
        style={{}}
    >
    </div>
    );
}

GraphP5.propTypes = {
    pxPerMin: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
};

GraphP5.defaultProps = {
    height: 500
};

export default GraphP5;