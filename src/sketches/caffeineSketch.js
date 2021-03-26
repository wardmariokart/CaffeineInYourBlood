import { clamp, TIME, leadingZeros, mapRange } from '../helpers.js';

const caffeineSketch = (p) => {

    const colors = {

        brownLight: p.color(147,112,90),
        brownMedium: p.color(99, 83, 73),
        brownDark:  p.color(79, 66, 57),
        sand:       p.color(237,230,199),
    };
    const bDeselectOnClickNone = false;

    let canvas;
    let width = 100;
    let height = 100;
    let pxPerMin = 0;
    let coffees = [];
    let selectedCoffeeId = null;
    let selectCoffeeById = () => {};
    let startDate = null;
    let absorptionTimeMin = 30;
    let halfLifeMin = 6 * TIME.minutesInHour
    let pxPerSample = 30;
    let bMouseOnCanvas = false;
    let mouseCanvasPosition = {x: 0, y: 0};
    let backgroundImage = null;

    // example: {url: '...', loadedImage: ...}
    const loadedImages = [];

    const bubble = {
        active: {
            widthPx: 50,
            heightPx: 65,
            cornerRadiusPx: 25,

            marginBottomPx: 20,
            paddingBottomPx: 10,
            paddingLeftRightPx: 6,
            
            arrowWidthPx: 12,
            arrowHeightPx: 16,
            
            backgroundColor: colors.brownDark,
            iconColor: colors.sand,
        },
        inactive: {
            widthPx: 20,
            heightPx: 30,
            cornerRadiusPx: 20,
            
            marginBottomPx: 10,
            paddingBottomPx: 6,
            paddingLeftRightPx: 3,
            
            arrowWidthPx: 8,
            arrowHeightPx: 8,
            
            backgroundColor: colors.brownDark,
            iconColor: colors.sand,
        },
        hover: {
            backgroundColor: colors.brownMedium,
        }
    };



    p.setup = () => {
        canvas = p.createCanvas(width, height);
        createBackgroundImage();
        canvas.elt.addEventListener('click', handleClickCanvas);

        /* canvas.getContext('2d')  */
        //canvas.elt.addEventListener('mousemove', handleMouseMoveCanvas);
        //canvas.elt.parentElement.parentElement.addEventListener('scroll', handleScroll);

       /*  canvas.elt.addEventListener('mouseenter', () => bMouseOnCanvas = true);
        canvas.elt.addEventListener('mouseleave', () => bMouseOnCanvas = false); */
        // Mouse move could also be done in here...
        
    }

    p.draw = () => {
        //p.background(colors.brownLight);
        drawBackground();

        const [vertices, peakVertex] = graphVertices();
        const peakCaffeineGraphHeight = 0.75; // Peak caffeine should be displayed at 75% of the y-axis

        const recommendedLimitMg = 250; // Do this via props
        const graphMaxCaffeineMg = Math.max(peakVertex.caffeineMg * 1 / peakCaffeineGraphHeight, recommendedLimitMg);
        const pxPerCaffeineMg = height / graphMaxCaffeineMg // y-axis scale

        vertices.forEach(vertex => {
            vertex.y = (height - vertex.caffeineMg * pxPerCaffeineMg);
        });

        drawGraphPoly(vertices);
        
        if (bMouseOnCanvas){
            drawMouse(mouseCanvasPosition.x, mouseCanvasPosition.y, vertices);
        } 
        drawBubbles();
    }

    p.myCustomRedrawAccordingToNewPropsHandler = (newProps) => {
        // Called before p.setup AND on rerende / prop change
        coffees = newProps.coffees;
        loadCoffeeImages();
        console.log('newprops');
        selectedCoffeeId = newProps.selectedCoffeeId;
        selectCoffeeById = newProps.selectCoffeeById;
        pxPerMin = newProps.pxPerMin;
        startDate = newProps.startDate;
        mouseCanvasPosition = newProps.mouseCanvasPosition;
        bMouseOnCanvas = newProps.bMouseOnCanvas;
        halfLifeMin = newProps.halfLifeMin;

        const prevWidth = width;
        const prevHeight = height;
        width = newProps.width;
        height = newProps.height;
        if(canvas){
            if (prevWidth !== width || prevHeight !== height) {
                p.resizeCanvas(width, height);
                createBackgroundImage();
            }
        }
    }

    const loadCoffeeImages = () => {
        coffees.forEach(coffee => {
            // check already loaded
            const bLoaded = loadedImages.some(loadedImage => loadedImage.url === coffee.imagePath);
            if (!bLoaded) {
                loadedImages.push({url: coffee.imagePath, loadedImage: p.loadImage(coffee.imagePath)});
                console.log(`New loaded!`);
            }
        })
    }

    const getLoadedImageByUrl = (imagePath) => {
        return loadedImages.find(loadedImage => imagePath === loadedImage.url);
    }

    const createBackgroundImage = () => {
        const sunset = {hour: 19, minute: 30};
        const sunrise = {hour: 7, minute: 0};
        const durationMs = 90 * TIME.msInMinute;
    

        const colorDay = colors.brownLight;
        const colorNight = colors.brownMedium;
    
        const dateToSkyColor = (date) => {
            const dateMs = date.getHours() * TIME.msInHour + date.getMinutes() * TIME.msInMinute;
            const sunsetStartMs = sunset.hour * TIME.msInHour + sunset.minute * TIME.msInMinute;
            const sunsetEndMs = sunsetStartMs + durationMs;
            
            const sunriseStartMs = sunrise.hour * TIME.msInHour + sunrise.minute * TIME.msInMinute;
            const sunriseEndMs = sunriseStartMs + durationMs;


            // optimized
            if (dateMs > sunriseEndMs && dateMs < sunsetStartMs) { // day
                return 1;  
            } else if (dateMs > sunsetEndMs && dateMs < sunriseStartMs) { // night
                return 0;
            } else if (dateMs >= sunsetStartMs && dateMs <= sunsetEndMs ) { // during sunset
                return clamp(mapRange(sunsetStartMs, sunsetEndMs, 1, 0, dateMs), 0,1);
            } else if  (dateMs >= sunriseStartMs && dateMs <= sunriseEndMs) { // during sunrise
                return clamp(mapRange(sunriseStartMs, sunriseEndMs, 0, 1, dateMs), 0,1);
            }

            return 0;
        }

        backgroundImage = p.createGraphics(width, 1);
        for(let x = 0; x < width; x++) {
            const a = dateToSkyColor(xPositionToDate(x));
            const outColor = p.lerpColor(colorNight, colorDay, a);
            backgroundImage.set(x, 0, outColor);
        }
        backgroundImage.updatePixels();
    }
    
    const drawBackground = () => {

        if (backgroundImage) {
            p.noSmooth();
            p.image(backgroundImage, 0, 0, width, height*2);
            p.smooth();
        }
    }

    const drawHorizontalGradient = (x, y, widthPx, heightPx, startColor, endColor, axis) => {
        // source: https://p5js.org/examples/color-linear-gradient.html (but I understand)
        for (let i = x; i <= x + widthPx; i++) {
            let inter = p.map(i, x, x + widthPx, 0, 1);
            let c = p.lerpColor(startColor, endColor, inter);
            p.stroke(c);
            p.line(i, y, i, y + heightPx);
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

    const drawBubbles = () => {
        coffees.forEach(coffee => {
            const bSelected = coffee.id === selectedCoffeeId;
            const bHovered = hitDetectionBubbles([coffee]).length > 0;
            const dimensions =  bSelected ? bubble.active : bubble.inactive;

            p.noStroke();
            /* colors.sand.setAlpha(255); */
            const fillColor = bHovered ? bubble.hover.backgroundColor : dimensions.backgroundColor;
            p.fill(fillColor);
            /* colors.sand.setAlpha(255); */

            const boundingBox = getBubbleBoundingBox(coffee); 

            p.rect(
                boundingBox.left, boundingBox.top,
                dimensions.widthPx, dimensions.heightPx,
                dimensions.cornerRadiusPx, dimensions.cornerRadiusPx, 0 , 0);

            p.triangle(
                boundingBox.center.x - dimensions.arrowWidthPx / 2, boundingBox.bottom,
                boundingBox.center.x + dimensions.arrowWidthPx / 2, boundingBox.bottom,
                boundingBox.center.x, boundingBox.bottom + dimensions.arrowHeightPx);

                
                const loadedImage = getLoadedImageByUrl(coffee.imagePath).loadedImage;
                if(loadedImage) {
                    const iconWidthPx = dimensions.widthPx - dimensions.paddingLeftRightPx * 2;
                    const aspectRatio =  loadedImage.height / loadedImage.width;
                    const iconDimensions = {widthPx: iconWidthPx, heightPx: iconWidthPx * aspectRatio};
                    p.tint(dimensions.iconColor);
                    p.image(loadedImage, boundingBox.left + dimensions.paddingLeftRightPx, boundingBox.bottom - dimensions.paddingBottomPx - iconWidthPx, iconDimensions.widthPx, iconDimensions.heightPx);
                    p.noTint();
            }
        })
    }

    const drawMouse = (x, y, vertices = []) => {

        const messages = [];
        let drawY = y;

        if(vertices.length > 0) {
            // find current caffeine level
            let prevId = vertices.length - 1;//vertices[vertices.length - 1];
            let nextId = vertices.length - 1;//vertices[vertices.length - 1];
            for(let i = 0; i < vertices.length; i++) {
                if (vertices[i].x > mouseCanvasPosition.x) {
                    prevId = Math.max(0, i - 1);
                    nextId = i;
                    break;
                }
            }
            const nextVertex = vertices[nextId];
            const prevVertex = vertices[prevId];
           // console.log({prevId, nextId});
           /*  p.fill('green');
            p.ellipse(nextVertex.x, nextVertex.y, 5, 5);
            p.fill('blue');
            p.ellipse(prevVertex.x, prevVertex.y, 5, 5); */
            const progressBetween = (x - prevVertex.x) / (nextVertex.x  - prevVertex.x);
            drawY = prevVertex.y - ( prevVertex.y - nextVertex.y ) * progressBetween;
            const t = xPositionToDate(mouseCanvasPosition.x);
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
        p.line(mouseCanvasPosition.x, 0, mouseCanvasPosition.x, height);

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
        //if (bMouseOnCanvas) xSampleInserts.push(mouseCanvasPosition.x);

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

    const dateToXPosition = (date) => {
        const timeSinceStartMs = date - startDate;
        return timeSinceStartMs / TIME.msInMinute * pxPerMin; 
    }

    const getBubbleBoundingBox = (coffee) => {
        const bSelected = coffee.id === selectedCoffeeId;
        const dimensions =  bSelected ? bubble.active : bubble.inactive;

        //center
        const x = dateToXPosition(coffee.consumedAt);
        const y = height - dimensions.marginBottomPx - dimensions.arrowHeightPx - dimensions.heightPx / 2;

        const top = y - dimensions.heightPx / 2;
        const right = x + dimensions.widthPx / 2;
        const bottom = y + dimensions.heightPx / 2;
        const left = x - dimensions.widthPx / 2;
        const center = {x, y};

        return {top, right, bottom, left, center};
    }

    const hitDetectionBubbles = (coffeesToCheck = null) => {
        coffeesToCheck = coffeesToCheck ?? coffees;
    
        if (!coffeesToCheck) return [];

        const mx = mouseCanvasPosition.x;
        const my = mouseCanvasPosition.y;

        return coffeesToCheck.filter(coffee => {
            const hitBox = getBubbleBoundingBox(coffee);
            return mx > hitBox.left && mx < hitBox.right && my > hitBox.top && my < hitBox.bottom;
        });
    }

    const getMousePositionFromEvent = (e) => {
        const frameRect = e.currentTarget.getBoundingClientRect();
        const localX = e.clientX - frameRect.left;
        const localY = e.clientY - frameRect.top;
        return {x: localX, y:localY};
    }

    const handleClickCanvas = (e) => {

        const coffeeHits = hitDetectionBubbles();
        if (coffeeHits.length > 0) {
            selectCoffeeById(coffeeHits[0].id);
        } else if (bDeselectOnClickNone) {
            selectCoffeeById(null);
        }
    };
    
    const handleMouseMoveCanvas = (e) => {
        //mouseCanvasPosition = getMousePositionFromEvent(e);
    }

}

export default caffeineSketch;