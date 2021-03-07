import styles from './../css/card.module.css';

const Card = ({coffee, coffeeTypes, setCoffeeType, updateCoffee, addEmptyCoffee, removeCoffee}) => {

    const handleChangeOption = (e) => {
        const typeId = parseInt(e.currentTarget.value);
        console.log(`new type: ${typeId}`);
        setCoffeeType(coffee, typeId);
    }

    const jsxOptions = coffeeTypes.map(type => <option key={`type-${type.id}`}value={type.id}>{type.name}</option>);

    let jsxTotalCaffeine = '';
    if ('sizeMl' in coffee && 'caffeineMgPerMl' in coffee) {
        jsxTotalCaffeine = coffee.sizeMl * coffee.caffeineMgPerMl;
    }

    return (
        <article className={styles.card}>
            <div className={styles.cardTop}>
                <div className={styles.cardTopFrame}>
                    <img className={styles.cardTopFrameIcon} src={coffee.imagePath ?? 'https://www.flaticon.com/svg/vstatic/svg/271/271228.svg?token=exp=1615053701~hmac=8a2fc7c5f208980e20e4a83c35cbd02e'} alt='your beverage'></img>
                </div>
                <div className={styles.cardTopMoment}>
                    <p className={styles.cardTopMomentTitle}>Drank at</p>
                    <p className={styles.cardTopMomentTime}>08:30</p>
                </div>
            </div>

            <div>
                <div className={styles.selectWrapper}>
                    <select className={styles.select} id='beverage-type' onChange={handleChangeOption} value={coffee.baseTypeId ?? false}>
                        <option className={styles.option} disabled value={false}>--Select your type</option>
                        {jsxOptions}
                    </select>
                </div>

                <div className={styles.cardMiddleTable}>
                    <span>Size</span>
                    <span>{coffee.sizeMl ?? ''}ml</span> 
                    <div>
                        <button>-</button>
                        <button>+</button>
                    </div>

                    <span>Caffeine</span>
                    <span>{jsxTotalCaffeine}mg</span> {/* Question: Ik zou graag 'coffee.getTotalCaffeine()' toevoegen maar functies worden niet gekopieerd adhv {...coffee} */}
                    <div>
                        <button>-</button>
                        <button>+</button>
                    </div>
                </div>
            </div>
                
            <div className={styles.cardBottom}>
                <button onClick={() => removeCoffee(coffee)}>delete</button>
                <button onClick={addEmptyCoffee}>add new</button>
            </div>
        </article>
    )

}

export default Card;