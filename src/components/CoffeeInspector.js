import './CoffeeInspector.css';
import Card from './Card.js';


/* import {EntityManager} from './../classes/entityManager.js'; */

export const CoffeeInspector = ({selectedCoffee, setCoffeeType, updateSelectedCoffee, addEmptyCoffee, removeCoffee, coffeeTypes}) => {


    const states = {IDLE: 0, INSPECTING: 1};
    const currentState = selectedCoffee ? states.INSPECTING : states.IDLE;
    const stateSuffixes = [
        {state: states.IDLE, suffix: 'IDLE'},
        {state: states.INSPECTING, suffix: 'inspecting'}
    ]
    const inspectorClass = `coffee-inspector--${stateSuffixes.filter(other => other.state === currentState)[0].suffix}`
 
    return (
        <section className={`coffee-inspector ${inspectorClass}`}>
            <h2>{inspectorClass}</h2>
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