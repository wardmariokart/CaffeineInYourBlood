import styles from '../css/cardTableRow.module.css';
import Button, {buttonSizes, buttonStyles} from './Button.js';

const CardTabelRow = ({title, value, valueSuffix, bCleanValue, onPlus, onMinus, onReset}) => {
    return (  
        <>
            <span className={styles.title}>{title}</span>
            <span className={styles.value}>{value} <span className={styles.valueSuffix}>{valueSuffix}</span></span>
            <div className={styles.buttons}>
                {onMinus &&                          <Button text='-' onClick={onMinus}     size={buttonSizes.small} style={buttonStyles.regular}/>} 
                {onPlus  &&                          <Button text='+' onClick={onPlus}      size={buttonSizes.small} style={buttonStyles.regular}/>} 
                {onReset && bCleanValue &&           <Button text='reset' onClick={onReset} size={buttonSizes.small} style={buttonStyles.accent}/>} 
            </div>
        </>
    );
}

//{onMinus    &&                          <button className={styles.button} onClick={onMinus}>-</button>}
export default CardTabelRow;