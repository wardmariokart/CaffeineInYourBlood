import ValidatedNumberInput from './ValidatedNumberInput.js';  
import { useRef } from 'react';
import styles from './../css/timeInput.module.css';

const TimeInput = ({hours, setHours, minutes, setMinutes}) => {

    const minuteInput = useRef(null);

    const onFinishedHour = () => {
        if(minuteInput !== null) minuteInput.current.focus(); console.log('focus next!');
        
    }

    const onFinishedMinute = () => {
        if(minuteInput !== null) minuteInput.current.blur();
    }

    return (
        <div className={styles.timeInput}>
            <ValidatedNumberInput
                maxValue={23}
                onFinished={onFinishedHour}
                setValue={setHours}
                value={hours}
            />
            <span className={styles.colon}>:</span>
            <ValidatedNumberInput
                maxValue={59}
                onFinished={onFinishedMinute}
                inputRef={minuteInput}
                value={minutes}
                setValue={setMinutes}
            />
        </div>

    )

}

export default TimeInput;