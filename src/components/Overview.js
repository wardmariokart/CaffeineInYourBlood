import React from 'react';

export const Overview = ({coffees, selectedCoffee, setSelectedCoffeeId}) => {
    
    return (
        <section>
            <ul> {coffees.map(coffee => (
                <li key={coffee.id} onClick={() => setSelectedCoffeeId(coffee.id)}>
                    {coffee.id === (selectedCoffee && selectedCoffee.id) ? <b>{coffee.name}({coffee.sizeMl}ml)</b> : <>{coffee.name}({coffee.sizeMl}ml)</>}
                </li>))}
            </ul>
        </section>
    );
}