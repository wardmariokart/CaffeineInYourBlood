import styles from './../css/coffeeInspector.module.css';
import Card from './Card.js';

const CoffeeInspector = ({selectedCoffee, setCoffeeType, updateCoffee, setCoffeeSizeMl, setCoffeeCaffeineMgPerMl, addEmptyCoffee, removeCoffee, coffeeTypes}) => {

    const states = {IDLE: 0, INSPECTING: 1};
    const currentState = selectedCoffee ? states.INSPECTING : states.IDLE;

    return (
        <section className={`${styles.inspector}`}>
            {currentState === states.IDLE && 
            <>
                <button className='coffee-inspector__add' onClick={addEmptyCoffee}>
                    <span>+</span>
                    <span>add a coffee</span>
                </button>
            </>
            }

            { currentState === states.INSPECTING && 
            <Card 
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