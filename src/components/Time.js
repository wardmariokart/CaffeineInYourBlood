import { leadingZeros } from '../helpers.js';
import { useState } from 'react';
import { TIME, modulo } from '../helpers.js'

const useTime = () => {
    
    const [days, setDaysInternal] = useState(0);
    const [hours, setHoursInternal] = useState(0);
    const [minutes, setMinutesInternal] = useState(0);

    const setTimeInternal = (d, h, m) => {
        d = d ?? days;
        h = h ?? hours;
        m = m ?? minutes;

        // minutes
        const cleanM = modulo(m, TIME.minutesInHour);
        let carryH = Math.floor(m / TIME.minutesInHour);
        if (m < 0) carryH -= 1; 
        
        // hours
        const dirtyH = h + carryH;
        const cleanH = modulo(dirtyH, TIME.hoursInDay);
        //console.log({h, carryH, dirtyH, cleanH});
        let carryD = Math.floor(h / TIME.hoursInDay);
        if(h < 0) carryD -= 1;

        // days
        const cleanD = d + carryD;
        
        setMinutesInternal(cleanM);
        setHoursInternal(cleanH);
        setDaysInternal(cleanD);
    }

    const setMinutes = (m) => setMinutesInternal(m)
    const setHours = (h) => setHoursInternal(h)
    const setDays= (d) => setDaysInternal(d)

 /*    const setMinutes = (m) => setTimeInternal(undefined, undefined, m)
    const setHours = (h) => setTimeInternal(undefined, h, undefined)
    const setDays = (d) => setTimeInternal(d, undefined, undefined) */

    const addMinutes = (m) => setTimeInternal(undefined, undefined, minutes + m)
    const addHours = (h) => setTimeInternal(undefined, hours + h, undefined)
    const addDays = (d) => setTimeInternal(days + d, undefined, undefined)
    

    return {time: {days, hours, minutes}, setMinutes, setHours, setDays, addMinutes, addHours, addDays, setTimeInternal};
}

export default useTime;