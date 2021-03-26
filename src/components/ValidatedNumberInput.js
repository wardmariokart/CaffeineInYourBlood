import styles from './../css/validatedNumberInput.module.css'; 
import { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { modulo, leadingZeros } from '../helpers/helpers.js';

const ValidatedNumberInput = ({value, setValue, maxValue, minValue, placeholder, onFinished, inputRef}) => {

    const formatNumber = (number) => leadingZeros(number.toString(), 2);
    
    const decorationTop = useRef(null);
    const decorationBottom = useRef(null);    
    
    const [inFocus, setInFocus] = useState(false);
    const [displayValue, setDisplayValue] = useState(formatNumber(value)); // value that is shown in field

    const shadowNumber = parseInt(value);
    const topValue = !isNaN(shadowNumber) ? leadingZeros(modulo(shadowNumber - 1, maxValue + 1), 2) : '00';
    const bottomValue = !isNaN(shadowNumber) ? leadingZeros(modulo(shadowNumber + 1, maxValue + 1), 2) : '02';

    const handleOnFocus = (e) => {
        setInFocus(true);
        fullSelectField(e.currentTarget);
    }
    
    const handleOnBlur = (e) => {
        setInFocus(false);
        const $field = e.currentTarget;
        const fieldValue = $field.value.slice(-2); // value = last 2 chars
        checkValidState(fieldValue, $field, false);

    }

    const handleOnChange = (e) => {
        const $field = e.currentTarget;
        console.log(`handle on change: ${e.currentTarget.value}`);
        const fieldValue = $field.value.slice(-2); // value = last 2 chars

        const maxLength = maxValue.toString().length;
        if(fieldValue.length === maxLength) {
            if (checkValidState(fieldValue, $field, true)) {
                onFinished();
            }
        } else {
            setDisplayValue(fieldValue);
        }

    }

    const checkValidState = (fieldValue, $field, bReselectOnInvalid) => {
        const regex = /^\d+$/g; // only digits allowed

        if(fieldValue.match(regex)) {
            const number = parseInt(fieldValue.match(regex).join(''));
            console.log(number);
            if(number >= minValue && number <= maxValue) {
                setValue(number);
                console.log(`set Value: ${number}`);
                setDisplayValue(formatNumber(number));
                return true;
            }
        }

        if (!bReselectOnInvalid) {
            setDisplayValue(formatNumber(value));
        } else {
            setDisplayValue(fieldValue);
        }

        fullSelectField($field);
        return false;
    }


    const fullSelectField = ($field) => {
        $field.setSelectionRange(0, $field.value.length);
    }

    return (
        <label className={`${styles.container} ${inFocus ? styles.focused : ''}`}>
            <div className={styles.background}></div>
            <div className={styles.contentWrapper}>
                <div className={styles.content}>
                    <span 
                        className={styles.contentNumber}
                        ref={decorationTop}
                        >{topValue}</span>
                    <input  
                        ref={inputRef}
                        type="text"
                        className={styles.contentInput} 
                        placeholder={placeholder}
                        value={displayValue}

                        onFocus={handleOnFocus}
                        onBlur={handleOnBlur}
                        onChange={handleOnChange}
                        ></input>
                    <span 
                        className={styles.contentNumber}
                        ref={decorationBottom}
                        >{bottomValue}</span>
                </div>
            </div>
        </label>
    );
}

ValidatedNumberInput.defaultProps = {
    minValue: 0,
    placeholder: '??',
    inputRef: null,
    onFinished: () => {},
}

ValidatedNumberInput.propTypes = {
    maxValue: PropTypes.number.isRequired,
    minValue: PropTypes.number,
    value: PropTypes.number.isRequired,
    setValue: PropTypes.func.isRequired,
}

export default ValidatedNumberInput;