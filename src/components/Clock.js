import { useState, useEffect, useRef } from 'react';
import useTime from './Time.js';
import styles from '../css/clock.module.css';

const Clock = () => {

    const [hours, setHours] = useState({display: 0, real: 0, bFullSelected: false});
    const [minutes, setMinutes] = useState({display: 15, real: 15, bFullSelected: false});
    const $hoursField = useRef(null); 
    const $minutesField = useRef(null); 

    useEffect(() => {
        const array = [
            {$field: $hoursField, value: hours},
            {$field: $minutesField, value: minutes}];

        array.forEach(element => {
            if (element.value.bFullSelected) {
                element.$field.current.select();
            }
        })
    }, [hours, minutes])

    const {time, setTimeMinutes, setTimeHours, setTimeInternal} = useTime(); 
    
    const handleFocusField = ($field) => {
        $field.current.setSelectionRange(0, $field.current.value.length);
    }

    const handleChangeField = ($field, maxValue, state, setter, $nextFocus = null) => {
        
        const value = $field.current.value.slice(-2);
        
        const maxLength = maxValue.toString().length;
        if (value.length === maxLength) {
            checkValidState($field, value, maxValue, state, setter, true, $nextFocus);
        } else {
            const copy = {...state, display: value , bFullSelected: false};
            setter(copy);
        }

    }

    const checkValidState = ($field, value, maxValue, state, setter, bReselectOnInvalid, $nextFocus = null) => {
        const regex = /^\d+$/g;
        const copy = {...state, display: value, bFullSelected: false}

        let bResetField = true;
        if(value.match(regex)) {
            const number = parseInt(value.match(regex).join(''));
            if (number >= 0 && number <= maxValue){
                $nextFocus !== null ? $nextFocus.current.focus() : $field.current.blur();
                copy.real = value;
                bResetField = false;                
            }
        }

        if (bResetField) {
            if (!bReselectOnInvalid) {
                copy.display = copy.real
            }
            copy.bFullSelected = bReselectOnInvalid;
        }

        setter(copy);
    }

    const handleBlurField = ($field, maxValue, state, setter) => {
        const value = $field.current.value.slice(-2);
        checkValidState($field, value, maxValue, state, setter, false, null);
    }

    return (
        <div>
            <input
                type='text'
                ref={$hoursField}
                value={hours.display}
                onChange={() => handleChangeField($hoursField, 23, hours, setHours, $minutesField)}
                onFocus={() => handleFocusField($hoursField)}
                onBlur={() => handleBlurField($hoursField, 23, hours, setHours, null)}/>
            <input 
                type='text'
                value={minutes.display}
                ref={$minutesField} 
                onChange={() => handleChangeField($minutesField, 59, minutes, setMinutes, null)}
                onFocus={() => handleFocusField($minutesField)}
                onBlur={() => handleBlurField($minutesField, 59,  minutes, setMinutes)}/>
            
        </div>
    )

}

export default Clock;