import { clamp, TIME, leadingZeros } from '../helpers.js';


const caffeineSketch = (p) => {
    let canvas;
    let width = 100;
    let height = 100;
    let pxPerMin = 0;
    let coffees = [];
    let startDate = null;
    let endDate = null;
    let absorptionTimeMin = 30;
    let halfLifeMin = 6 * TIME.minutesInHour
    let pxPerSample = 30;
    let bMouseOnGraph = false;
    let mouseGraphPosition = {x: 0, y: 0};

    const colors = {
        brownLight: p.color(147,112,90),
        sand:       p.color(237,230,199),
    }

    p.setup = () => {
        console.log('sketch.setup() -> This should be 2nd')
        canvas = p.createCanvas(width, height);
        p.noStroke();
    }

    p.draw = () => {
        p.background(colors.brownLight);

        const [vertices, peakVertex] = graphVertices();
        const peakCaffeineGraphHeight = 0.75; // Peak caffeine should be displayed at 75% of the y-axis

        const recommendedLimitMg = 250; // Do this via props
        const graphMaxCaffeineMg = Math.max(peakVertex.caffeineMg * 1 / peakCaffeineGraphHeight, recommendedLimitMg);
        const pxPerCaffeineMg = height / graphMaxCaffeineMg // y-axis scale

        vertices.forEach(vertex => {
            vertex.y = (height - vertex.caffeineMg * pxPerCaffeineMg);
        });

        drawGraphPoly(vertices);
        drawCoffees(pxPerCaffeineMg);

        if (bMouseOnGraph){
            drawMouse(mouseGraphPosition.x, mouseGraphPosition.y, vertices);
        } 

    }

    p.myCustomRedrawAccordingToNewPropsHandler = (newProps) => {
        // Called before p.setup AND on rerende / prop change
        
        coffees = newProps.coffees;
        pxPerMin = newProps.pxPerMin;
        startDate = newProps.startDate;
        endDate = newProps.endDate;
        mouseGraphPosition = newProps.mouseGraphPosition;
        bMouseOnGraph = newProps.bMouseOnGraph;
        halfLifeMin = newProps.halfLifeMin;

        const prevWidth = width;
        const prevHeight = height;
        width = newProps.width;
        height = newProps.height;
        if(canvas) //Make sure the canvas has been created            
            if (prevWidth !== width || prevHeight !== height) {
                p.resizeCanvas(width, height);
            }
    }

    const drawGraphPoly = (vertices) => {
        if(vertices.length <= 1) return;

        const bDrawDots = true;
        if(bDrawDots) {
            p.noStroke();
            //p.fill(colors.sand);
            p.noFill();
            vertices.forEach(vertex => p.ellipse(vertex.x, vertex.y, 3,3));
        }


        const bDrawSmooth = false;

        colors.sand.setAlpha(50);
        p.fill(colors.sand);
        colors.sand.setAlpha(255);
        p.stroke(colors.sand);
        p.strokeWeight(1);
        
        const drawVertexSmooth = (vertex) => p.curveVertex(vertex.x, vertex.y);
        const drawVertex = (vertex) => p.vertex(vertex.x, vertex.y);
        p.beginShape();
        if (bDrawSmooth) drawVertexSmooth(vertices[0]);
        vertices.forEach(vertex => {
            bDrawSmooth ? drawVertexSmooth(vertex) : drawVertex(vertex);
        });
        if (bDrawSmooth) drawVertexSmooth(vertices[vertices.length - 1]);
        p.endShape();
    }

    const drawCoffees = (pxPerCaffeineMg) => {
        
        const pinWidthHalf = 20/2;
        const pinHeightHalf = 30/2;
        const cornerRadius = 20;

        const arrowHeightHalf = 8/2;
        const arrowWidthHalf = 8/2;

        const bottomMargin = 8;

        p.noStroke();
        colors.sand.setAlpha(255);
        p.fill(colors.sand);
        colors.sand.setAlpha(255);

        coffees.forEach(coffee => {
            const x = dateToXPosition(coffee.consumedAt);
            const y = height - bottomMargin - arrowHeightHalf * 2  - pinHeightHalf;
            
            p.rect(
                x - pinWidthHalf, y - pinHeightHalf,
                pinWidthHalf * 2, pinHeightHalf * 2,
                cornerRadius, cornerRadius, 0 , 0);

            p.triangle(
                x - arrowWidthHalf, y + pinHeightHalf,
                x + arrowWidthHalf, y + pinHeightHalf,
                x, y + pinHeightHalf + arrowHeightHalf * 2,
            )
        })
    }

    const drawMouse = (x, y, vertices = []) => {

        const messages = [];
        let drawY = y;

        if(vertices.length > 0) {
            // find current caffeine level
            let prevId = vertices[vertices.length - 1];
            let nextId = vertices[vertices.length - 1];
            for(let i = 0; i < vertices.length; i++) {
                if (vertices[i].x > mouseGraphPosition.x) {
                    prevId = Math.max(0, i - 1);
                    nextId = i;
                    break;
                }
            }
            const nextVertex = vertices[nextId];
            const prevVertex = vertices[prevId];
           /*  p.fill('green');
            p.ellipse(nextVertex.x, nextVertex.y, 5, 5);
            p.fill('blue');
            p.ellipse(prevVertex.x, prevVertex.y, 5, 5); */
            const progressBetween = (x - prevVertex.x) / (nextVertex.x  - prevVertex.x);
            drawY = prevVertex.y - ( prevVertex.y - nextVertex.y ) * progressBetween;
            const t = xPositionToDate(mouseGraphPosition.x);
            messages.push({bBold: false, fontSize: 15, lineHeight: 18, message: `${leadingZeros(t.getHours(), 2)}:${leadingZeros(t.getMinutes(), 2)}`});
            const caffeineAtMouseMg = caffeineMgAtTimeMin2(t, prevVertex.time, prevVertex.caffeineMg);
            messages.push({bBold: true, fontSize: 20, lineHeight: 16, message: `${caffeineAtMouseMg.toFixed(0)}mg`});
            
            let caffeineTip = '';
            if (caffeineAtMouseMg > 100) {
                caffeineTip = 'a lot!';
            }
            else if (caffeineAtMouseMg > 10) {
                caffeineTip = 'noticable';
            }else if (caffeineAtMouseMg > 0) {
                caffeineTip = 'neglectable';
            }

            caffeineTip = caffeineTip.length > 0 ? `(${caffeineTip})` : caffeineTip;
            messages.push({bBold: false, fontSize: 12, lineHeight: 10, message: caffeineTip});
        }

        p.noStroke();
        p.fill(colors.sand);
        p.textAlign(p.RIGHT);

        const lineHeightMultiplier = 1;
        let cursorOffsetY = 0; // New line y offset 
        let textOffsetY = -15; // align with
        messages.forEach((m, idx) => {if (idx < messages.length - 1) textOffsetY += m.lineHeight * lineHeightMultiplier;});
        //totalTextHeight = 0;
        messages.forEach(m => {
            p.textStyle(m.bBold ? p.BOLD : p.NORMAL);
            p.textSize(m.fontSize);
            p.text(m.message, x - 12, y - textOffsetY + cursorOffsetY);
            cursorOffsetY += m.lineHeight * lineHeightMultiplier;
        })
       
        p.stroke(colors.sand);
        p.noFill();
        p.ellipse(x, drawY, 15, 15);
        p.line(mouseGraphPosition.x, 0, mouseGraphPosition.x, height);

    }

    // Exponential decay (multiple beverages)
    const graphVertices = () => {
        
        const vertices = [];

        let peakVertex = {caffeineMg: 0};
        let xProgressPx = 0;

        let previousCaffeineMg = 0;
        let previousDate = (new Date(startDate - pxPerSample / pxPerMin * TIME.msInMinute)); /*  */;

        const xSampleInserts = [];
        coffees.forEach(coffee => xSampleInserts.push(dateToXPosition(coffee.consumedAt.getTime()), dateToXPosition(coffee.consumedAt.getTime() + absorptionTimeMin * TIME.msInMinute)));
        //if (bMouseOnGraph) xSampleInserts.push(mouseGraphPosition.x);

        let lastRegularProgressPx = 0;
        while(xProgressPx <= width) {
            
            const t = xPositionToDate(xProgressPx);
            const caffeineMg = caffeineMgAtTimeMin2(t, previousDate, previousCaffeineMg, false);
            const vertex = {x: xProgressPx, caffeineMg, time: t}; 

            //peakVertex.caffeineMg = Math.max(peakVertex.caffeineMg, vertex.caffeineMg);
            if (peakVertex.caffeineMg <= vertex.caffeineMg) {
                peakVertex = vertex;
            }

            vertices.push(vertex);
            
            previousCaffeineMg = vertex.caffeineMg;
            previousDate = t;


            // check if any extra sample is nearer than next sample            
            const regularSampleDeltaPx = xProgressPx < width ? Math.min(pxPerSample, width - xProgressPx) : pxPerSample;
            const nextRegularSamplePx = lastRegularProgressPx + regularSampleDeltaPx;
            
            const getClosestInsertedSample = (samples, currentX) => {
                let closestInsertedSample = Number.MAX_VALUE;
                for(let i = 0; i < samples.length; i++) {
                    const insert = samples[i];
                    if (   insert > currentX 
                        && insert - currentX < closestInsertedSample - currentX) {
                        closestInsertedSample = insert;
                    }
                }    
                return closestInsertedSample; 
            }
            
            
            const closest = getClosestInsertedSample(xSampleInserts, xProgressPx);
            if (closest < nextRegularSamplePx) {
                xProgressPx = closest;
            } else {
                xProgressPx = nextRegularSamplePx;
                lastRegularProgressPx = xProgressPx;
            }
        }

        // Closing vertex
        xProgressPx += pxPerSample;
        const closingVertex = {x: xProgressPx, time: xPositionToDate(xProgressPx), caffeineMg: 0};
        vertices.push(closingVertex);

        return [vertices, peakVertex];
    }



    // t is of type date
    const caffeineMgAtTimeMin = (t) => {

        let caffeineMg = 0;
        coffees.filter(filter => !filter.bInCreation).forEach(coffee => {

            const inBloodTimeMin = (t - coffee.consumedAt) / TIME.msInMinute;
            const timeSincePeakMin = Math.max(0, inBloodTimeMin - absorptionTimeMin);
            const absorptionPhaseMg = clamp(inBloodTimeMin / absorptionTimeMin, 0, 1) * coffee.sizeMl * coffee.caffeineMgPerMl;
            const caffeineLeftMg = absorptionPhaseMg * Math.pow(1/2, timeSincePeakMin / halfLifeMin); 
            caffeineMg += Math.max(0,caffeineLeftMg);
        });
        return caffeineMg;
    }

    const caffeineMgAtTimeMin2 = (t, tPrev, cPrev, bDebugLogTemp = false) => {

        const tDeltaMin = (t - tPrev) / TIME.msInMinute;
        
        let totalAbsorptionDeltaMg = 0;
        if (coffees.length > 0) {
            coffees.forEach(coffee => {
                const inBloodTimeMin = (t - coffee.consumedAt) / TIME.msInMinute;
                if (inBloodTimeMin >= 0 && inBloodTimeMin <= absorptionTimeMin) {
                    const peakCaffeineMg = coffee.sizeMl * coffee.caffeineMgPerMl;
                    const absorptionDeltaMg = peakCaffeineMg / absorptionTimeMin * Math.min(inBloodTimeMin, tDeltaMin);
                    totalAbsorptionDeltaMg += absorptionDeltaMg;
                    
                    if(bDebugLogTemp) console.log({inBloodTimeMin});
                }
            });
        }

        const caffeineLeftMg = cPrev * Math.pow(1/2, tDeltaMin / halfLifeMin);
        
        return caffeineLeftMg + totalAbsorptionDeltaMg;
    }
    const xPositionToDate = (x) => {
        const elpasedTimeMs = x / pxPerMin * TIME.msInMinute;
        const t = new Date();
        t.setTime(startDate + elpasedTimeMs);
        return t;
    }

    const dateToXPosition= (date) => {
        const timeSinceStartMs = date - startDate;
        return timeSinceStartMs / TIME.msInMinute * pxPerMin; 
    }

}

export default caffeineSketch;