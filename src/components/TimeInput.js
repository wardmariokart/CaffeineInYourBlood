export const TimeInput = ({time, setTime}) => {

    const handleTimeChange = (updatedProperties) =>
    {
        const timeKeys = Object.keys(time);
        console.log(timeKeys);
        
        const timeClone = {...time};
        timeKeys.forEach(key => {
            if(key in updatedProperties)
            {
                timeClone[key] = updatedProperties[key];
            }
        })

        setTime(timeClone);
    }

    const handleChangeMinutes = (newMinutes) => {
        const minutesInHour = 60;
        const totalMinutes = time.hours * minutesInHour + newMinutes;
        const convertedHours = Math.floor(totalMinutes/minutesInHour);
        const convertedMinutes = totalMinutes - convertedHours * minutesInHour;
        handleTimeChange({hours: convertedHours, minutes: convertedMinutes});
    }

    const handleChangeHours = (newHours) => {

        /* handleTimeChange({hours: newHours}) */
    }

    return <span>
        <input type='number' value={time.hours} onChange={(e) => handleChangeHours(parseInt(e.currentTarget.value))}></input>
        :
        <input type='number' value={time.minutes} onChange={(e) => handleChangeMinutes(parseInt(e.currentTarget.value))}></input>
    </span>;
}