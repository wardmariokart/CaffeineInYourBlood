import styles from './../css/card.module.css';
import TimeInput from './TimeInput.js';

const Card = ({coffee, coffeeTypes, setCoffeeType, updateCoffee, setCoffeeSizeMl, setCoffeeCaffeineMgPerMl, addEmptyCoffee, removeCoffee}) => {

    const handleChangeOption = (e) => {
        const typeId = parseInt(e.currentTarget.value);
        console.log(`new type: ${typeId}`);
        setCoffeeType(coffee, typeId);
    }

    const jsxOptions = coffeeTypes.map(type => <option key={`type-${type.baseTypeId}`}value={type.baseTypeId}>{type.name}</option>);

    let jsxTotalCaffeine = '';
    if ('sizeMl' in coffee && 'caffeineMgPerMl' in coffee) {
        jsxTotalCaffeine = (coffee.sizeMl * coffee.caffeineMgPerMl).toFixed(0);
    }

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

    
    console.log(`new coffee on card:`);
    console.log(`${coffee.consumedAt.getHours()}`);
    console.log({coffee});
    
    return (
        <article className={styles.card}>
            <div className={styles.cardTop}>
                <div className={styles.cardTopFrame}>
                    <img className={styles.cardTopFrameIcon} src={coffee.imagePath ?? 'https://www.flaticon.com/svg/vstatic/svg/271/271228.svg?token=exp=1615053701~hmac=8a2fc7c5f208980e20e4a83c35cbd02e'} alt='your beverage'></img>
                </div>
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

            <div>
                <div className={styles.selectWrapper}>
                    <select className={styles.select} id='beverage-type' onChange={handleChangeOption} value={coffee.baseTypeId ?? false}>
                        <option className={styles.option} disabled value={false}>--Select your type</option>
                        {jsxOptions}
                    </select>
                </div>

                {!coffee.bInCreation && <div className={styles.cardMiddleTable}>
                    <span>Size</span>
                    <span>{coffee.sizeMl ?? ''}ml</span> 
                    <div className={styles.tableButtons}>
                        <button className={styles.button} onClick={() => {console.log({coffee});setCoffeeSizeMl(coffee.id, coffee.sizeMl - coffee.deltaSizeMl);}}>-</button>
                        <button className={styles.button} onClick={() => setCoffeeSizeMl(coffee.id, coffee.sizeMl + coffee.deltaSizeMl)}>+</button>
                        {   coffee.sizeMl !== coffee.baseSizeMl && 
                            <button className={styles.buttonReset} onClick={() => setCoffeeSizeMl(coffee.id, coffee.baseSizeMl)}>reset</button>
                        }
                    </div>

                    <span>Caffeine</span>
                    <span>{jsxTotalCaffeine}mg</span> {/* Question: Ik zou graag 'coffee.getTotalCaffeine()' toevoegen maar functies worden niet gekopieerd adhv {...coffee} */}
                    {/* <div>
                        <button onClick={() => {console.log({coffee});setCoffeeCaffeineMgPerMl(coffee.id, coffee.caffeineMgPerMl - coffee.deltaCaffeineMgPerMl);}}>-</button>
                        <button onClick={() => setCoffeeCaffeineMgPerMl(coffee.id, coffee.caffeineMgPerMl + coffee.deltaCaffeineMgPerMl)}>+</button>
                        {   coffee.caffeineMgPerMl !== coffee.baseCaffeineMgPerMl && 
                            <button onClick={() => setCoffeeCaffeineMgPerMl(coffee.id, coffee.baseCaffeineMgPerMl)}>reset</button>
                        }
                    </div> */}
                </div>}
            </div>
                
            <div className={styles.cardBottom}>
                <button className={styles.cardBottomButton} onClick={() => removeCoffee(coffee)}>delete</button>
                <button className={styles.cardBottomButton} onClick={addEmptyCoffee}>add new</button>
            </div>
        </article>
    )

}

export default Card;