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
                    <img src={coffee.imagePath ?? 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Question_mark_%28black%29.svg/1200px-Question_mark_%28black%29.svg.png'} alt='your beverage'></img>
                </div>
                <div className={styles.cardTopMoments}>
                    <p>Drank at</p>
                    <p>08:30</p>
                </div>
            </div>

            <div>
                <select onChange={handleChangeOption} value={coffee.baseTypeId ?? false}>
                    <option disabled value={false}>--Select your type</option>
                    {jsxOptions}
                </select>
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