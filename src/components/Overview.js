import './Overview.css';
import React from 'react';

const Overview = ({coffees, selectedCoffee, selectCoffeeById}) => {
    
    return (
        <section className='overview'>
            <ul> {coffees.filter(filter => !filter.bInCreation).map(coffee => (
                <li key={coffee.id} onClick={() => selectCoffeeById(coffee.id)}>
                    {coffee.id === (selectedCoffee && selectedCoffee.id) ? <b>{coffee.name}({coffee.sizeMl}ml)</b> : <>{coffee.name}({coffee.sizeMl}ml)</>}
                </li>))}
            </ul>
        </section>
    );
}

export default Overview;