import React from 'react'; //Why is this needed already?
import {PropTypes} from 'prop-types';

/* import {EntityManager} from './../classes/entityManager.js'; */

export const CoffeeInspector = ({selectedCoffee, updateSelectedCoffee, addCoffee}) => {

    const handleCreateEspresso = () => {
        addCoffee({name: 'espresso', sizeMl: 30, caffeineMgPerMl: 1.3});
    }
    
    const handleCreateLatte = () => {
        addCoffee({name: 'latte', sizeMl: 475, caffeineMgPerMl: 0.35});
    }

 



    return (
        <section>
            {selectedCoffee && <>
                <h2>{selectedCoffee.name}</h2>
                <p>Size: {selectedCoffee.sizeMl}ml</p>
                <p>Caffeine: {selectedCoffee.sizeMl * selectedCoffee.caffeineMgPerMl}mg</p>  
                <button onClick={() => updateSelectedCoffee({sizeMl: selectedCoffee.sizeMl + 30})}>Make this coffee larger</button>
            </>}
            <button onClick={handleCreateEspresso}> + Espresso</button>
            <button onClick={handleCreateLatte}> + Latte</button>
            <p>add a coffee</p>            
        </section>
    );
}

CoffeeInspector.propTypes = {
}

CoffeeInspector.defaultProps = {
}