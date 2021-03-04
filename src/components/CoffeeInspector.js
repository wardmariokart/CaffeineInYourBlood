import styles from './../css/coffeeInspector.module.css';
import Card from './Card.js';

export const CoffeeInspector = ({selectedCoffee, setCoffeeType, updateSelectedCoffee, addEmptyCoffee, removeCoffee, coffeeTypes}) => {

    const states = {IDLE: 0, INSPECTING: 1};
    const currentState = selectedCoffee ? states.INSPECTING : states.IDLE;

    return (
        <section className={`${styles.inspector}`}>
            <h2>Inspector state: {Object.keys(states).find(key => states[key] === currentState)}</h2>
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