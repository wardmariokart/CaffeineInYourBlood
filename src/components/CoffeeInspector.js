import styles from './../css/coffeeInspector.module.css';
import Card from './Card.js';

const CoffeeInspector = ({selectedCoffee, setCoffeeType, updateCoffee, setCoffeeSizeMl, setCoffeeCaffeineMgPerMl, addEmptyCoffee, removeCoffee, coffeeTypes}) => {

    const states = {idle: 0, inspecting: 1};
    const currentState = selectedCoffee ? states.inspecting : states.idle;

    return (
        <section className={styles.container}>
            <h2 style={{display: 'none'}}>Coffee Inspector</h2>
            {currentState === states.idle && 
            <div className={`${styles.inspector}`}>
                <button className={styles.emptyAdd} onClick={addEmptyCoffee}>
                    <span>+</span>
                </button>
            </div>
            }

            { currentState === states.inspecting && 
            <Card 
                key={selectedCoffee ? selectedCoffee.id : -1}
                coffee={selectedCoffee}
                coffeeTypes={coffeeTypes}
                updateCoffee={updateCoffee}
                setCoffeeSizeMl={setCoffeeSizeMl}
                setCoffeeCaffeineMgPerMl={setCoffeeCaffeineMgPerMl}
                setCoffeeType={setCoffeeType}
                addEmptyCoffee={addEmptyCoffee}
                removeCoffee={removeCoffee}
            /> }
        </section>
    );
}

CoffeeInspector.propTypes = {
}

CoffeeInspector.defaultProps = {
}

export default CoffeeInspector;