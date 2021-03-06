import {modulo} from '../helpers.js';

export const TimeInput2 = ({time, setTime}) => {


    /* NOT DONE YET.... */
    const handleTimeChange = (updatedProperties) =>
    {
        const timeKeys = Object.keys(time);
        
        let timeClone = {...time};
        timeKeys.forEach(key => {
            if(key in updatedProperties)
            {
                const maxDigits = 2;
                let newValue = updatedProperties[key];
                if(newValue.toString.length > maxDigits) newValue = newValue.toString().slice(-maxDigits);
                timeClone[key] = newValue;
            }
        });

        console.log(`${timeClone.hours}h ${timeClone.minutes}`);


        timeClone = toValidTime(timeClone);
        setTime(timeClone);
    }

    const toValidTime = (toValidate) =>
    {
        const minutes = toValidate.minutes ?? time.minutes;
        const hours = toValidate.hours ?? time.hours;

        const hoursInDay = 24;
        const minutesInHour = 60;

        const totalMinutes = modulo(hours * minutesInHour + minutes, hoursInDay * minutesInHour);
        const validHours = modulo(Math.floor(totalMinutes/minutesInHour), hoursInDay);
        const validMinutes = totalMinutes - validHours * minutesInHour;
        console.log({validHours, validMinutes});
        return {hours: validHours, minutes: validMinutes};
    };

    return <span>
        <input type='number' maxLength={2} value={time.hours} onChange={(e) => handleTimeChange({hours: parseInt(e.currentTarget.value)})}></input>
        :
        <input type='number' maxLength={2} value={time.minutes} step={15} onChange={(e) => handleTimeChange({minutes: parseInt(e.currentTarget.value)})}></input>
    </span>;
}