import { useRef } from 'react';
import styles from './../css/card.module.css';
import TimeInput from './TimeInput.js';
import CardTableRow from './CardTableRow.js';
import { leadingZeros, shortenString } from '../helpers/helpers.js'
import Button, {buttonSizes, buttonStyles} from './Button.js';
import { BEVERAGECATEGORIES } from '../assets/data/beverageTypes'

const Card = ({coffee, coffeeTypes, setCoffeeType, updateCoffee, setCoffeeSizeMl, setCoffeeCaffeineMgPerMl, addEmptyCoffee, removeCoffee}) => {

    const shineRef = useRef();

    const handleChangeOption = (e) => {
        const typeId = parseInt(e.currentTarget.value);
        setCoffeeType(coffee, typeId);
    }


    const filterByCategory = (beverages, category) => beverages.filter(filter => filter.category === category);
    const mapToOptions = (beverages) => beverages.map(beverage => <option key={`type-${beverage.baseTypeId}`} value={beverage.baseTypeId}>{beverage.name}</option>);
    
    const optionInstructions = [
        {blockName: 'Brewed'        ,filterCategory: BEVERAGECATEGORIES.NORMAL},
        {blockName: 'Capsules'      ,filterCategory: BEVERAGECATEGORIES.CAPSULE},
        {blockName: 'Starbucks™'     ,filterCategory: BEVERAGECATEGORIES.STARBUCKS},
        {blockName: 'Non-coffees'   ,filterCategory: BEVERAGECATEGORIES.NONCOFEE}];

    let jsxOptions = [];
    jsxOptions.push(<option className={styles.option} key='option-default' disabled value={false}>Select a drink</option>)
    optionInstructions.forEach(instruction => {
        jsxOptions.push(<option className={styles.option} key={`option-spacer-${instruction.blockName}`} disabled>{`──── ${instruction.blockName} ────`}</option>);
        const filtered = filterByCategory(coffeeTypes, instruction.filterCategory);
        jsxOptions.push(mapToOptions(filtered));
        jsxOptions.push(<option key={`option-spacer-disabled-${instruction.blockName}`} disabled></option>)
    });

    const handleUpdateHours = (hours) => {

        console.log(`Consumed At before: ${coffee.consumedAt.getHours()}`);
        const newConsumedAt = new Date(coffee.consumedAt.getTime());
        newConsumedAt.setHours(hours)
        console.log(`Consumed At after: ${newConsumedAt.getHours()}`);
        updateCoffee(coffee.id, {consumedAt: newConsumedAt});
    };

    const handleUpdateMinutes = (minutes) => {
        const newConsumedAt = new Date(coffee.consumedAt.getTime());
        newConsumedAt.setMinutes(minutes)
        updateCoffee(coffee.id, {consumedAt: newConsumedAt});
    };

    const triggerShine = () => {
        if(shineRef.current) {
            const $element = shineRef.current;
            const $newElement = $element.cloneNode(true);
            $element.parentNode.replaceChild($newElement, $element);
            shineRef.current = $newElement;
        }
    }

    return (
        <article className={styles.container}>
            <div className={`${styles.shine} ${styles.shineAnimation}`} ref={shineRef}>
            </div>
            <header className={styles.header}>
                {coffee.bInCreation ? 
                    <h3 className={styles.headerTitle}>New coffee</h3> :
                    <h3 className={styles.headerTitle}>{`${shortenString(coffee.name, 20)} @ ${leadingZeros(coffee.consumedAt.getHours(),2)}:${leadingZeros(coffee.consumedAt.getMinutes(),2)}`}</h3>
                }
            </header>
            <div className={`${styles.card} ${coffee.bInCreation ? styles.inCreation : ''}`}>

                <div className={styles.cardTop}>
                    <div className={styles.cardTopFrame}>
                        {coffee.imagePath && <img className={styles.cardTopFrameIcon} src={coffee.imagePath} alt='your beverage'></img>}
                    </div>
                    <div className={styles.cardTopMomentWrapper}>
                        <div className={styles.cardTopMoment}>
                            <p className={styles.cardTopMomentTitle}>Drank at</p>
                            {coffee && <TimeInput
                                key={`${coffee.id}`}/* This ensures resetting the TimeInput state from the start. If left out, you cannot change the input fields value from outside the component */
                                hours={coffee.consumedAt.getHours()}
                                setHours={handleUpdateHours}
                                minutes={coffee.consumedAt.getMinutes()}
                                setMinutes={handleUpdateMinutes}
                            />}
                        </div>
                    </div>
                </div>
                <div>
                    <div className={styles.selectWrapper}>
                        <select className={styles.select} id='beverage-type' onChange={(e) => {handleChangeOption(e); triggerShine();}} value={coffee.baseTypeId ?? false}>
                            
                            {jsxOptions}
                        </select>
                    </div>
                    {!coffee.bInCreation && <div className={styles.cardMiddleTable}>
                        <CardTableRow 
                            title='Size'
                            value={`${coffee.sizeMl.toFixed(0)}`}
                            valueSuffix='ml'
                            bCleanValue={coffee.sizeMl !== coffee.baseSizeMl}
                            onMinus={() => setCoffeeSizeMl(coffee.id, coffee.sizeMl - coffee.deltaSizeMl)}
                            onPlus={() => setCoffeeSizeMl(coffee.id, coffee.sizeMl + coffee.deltaSizeMl)}
                            onReset={() => setCoffeeSizeMl(coffee.id, coffee.baseSizeMl)}
                        />
                        <CardTableRow 
                            title='Caffeine/ml'
                            value={`${(coffee.caffeineMgPerMl).toFixed(1)}`}
                            valueSuffix='mg/ml'
                            bCleanValue={coffee.caffeineMgPerMl !== coffee.baseCaffeineMgPerMl}
                            onMinus={() => updateCoffee(coffee.id, {caffeineMgPerMl: Math.max(coffee.caffeineMgPerMl - coffee.deltaCaffeineMgPerMl, 0)})}
                            onPlus={() => updateCoffee(coffee.id, {caffeineMgPerMl: Math.max(coffee.caffeineMgPerMl + coffee.deltaCaffeineMgPerMl, 0)})}
                            onReset={() => updateCoffee(coffee.id, {caffeineMgPerMl: coffee.baseCaffeineMgPerMl})}
                        />
                        <CardTableRow 
                            title='Caffeine total'
                            value={`${(coffee.sizeMl * coffee.caffeineMgPerMl).toFixed(0)}`}
                            valueSuffix='mg'
                            bCleanValue={coffee.sizeMl !== coffee.baseSizeMl}
                        />
                    </div>}
                </div>
                            
                <div className={styles.cardBottom}>
                    {/* <button className={styles.cardBottomButton} onClick={triggerShine}>Shine</button> */}

                    <Button text='delete' onClick={() => removeCoffee(coffee)} size={buttonSizes.small} style={buttonStyles.regular}/>
                    <Button text='add new' onClick={addEmptyCoffee} size={buttonSizes.regular} style={buttonStyles.regular}/>
                   {/*  <button className={styles.cardBottomButtonRemove} onClick={() => removeCoffee(coffee)}>delete</button>
                    <button className={styles.cardBottomButtonNew} onClick={addEmptyCoffee}>add new</button> */}
                </div>
            </div>
        </article>

    )

}

export default Card;