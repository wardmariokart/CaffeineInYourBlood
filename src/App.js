import './App.css';
import  {useState} from 'react';
import {CoffeeInspector} from './components/CoffeeInspector.js';
import {Overview} from './components/Overview.js';
import {SleepInspector} from './components/SleepInspector.js';
import {EntityManager} from './classes/entityManager.js';

const App = () => {

  const coffeeTypes = [
    {
      id: 1,
      name: 'espresso',
      sizeMl: 30,
      caffeinePerMl: 1.3
    },
    {
      id: 2,
      name: 'doppio',
      sizeMl: 60,
      caffeinePerMl: 1.3,
    },
    {
      id: 3,
      name: 'latte',
      sizeMl: 473,
      caffeinePerMl: 0.33
    }
  ]
  const exampleCoffee = {id: undefined, baseTypeId: undefined, name: undefined, caffeinePerMl: undefined, sizeMl: undefined};
  


  /* ___________________________________________________________ COFFEES  */
  const [coffees, setCoffees] = useState([]);
  
  const addCoffee = (coffee) => {
    const coffeesClone = [...coffees];
    coffeesClone.push({...coffee, id: coffeesClone.length + 1});
    setCoffees(coffeesClone);
  }

  const updateCoffee = (coffeeId, updatedProperties) => {
    const propertyKeys = Object.keys(exampleCoffee);
    const coffeeIndex = coffees.findIndex(check => check.id === coffeeId);
    const clonedCoffee = {...coffees[coffeeIndex]}

    propertyKeys.forEach(propertyKey => {
      if(propertyKey in updatedProperties) {
        clonedCoffee[propertyKey] = updatedProperties[propertyKey];
      }
    });

    const clonedCoffees = [...coffees];
    clonedCoffees[coffeeIndex] = clonedCoffee;
    setCoffees(clonedCoffees);
  }


  /* ___________________________________________________________ SELECTED COFFEE  */
  const [selectedCoffeeId, setSelectedCoffeeId] = useState(null);
  const selectedCoffee = () => {
    const index = coffees.findIndex(check => check.id === selectedCoffeeId);
    return index === -1 ? null : coffees[index];
  };

  const [entityManager, setEntityManager] = useState(new EntityManager());
  entityManager.SetSetter(setEntityManager);

  const [sleepFrom, setSleepFrom] = useState({hours: 23, minutes: 15});
  const [sleepUntil, setSleepUntil] = useState({hours: 7, minutes: 0});



  return (
    <div>
      <Overview         selectedCoffee={selectedCoffee()} coffees={coffees} setSelectedCoffeeId={setSelectedCoffeeId} sleepFrom={sleepFrom} sleepUntil={sleepUntil}/>
      <CoffeeInspector  selectedCoffee={selectedCoffee()} updateSelectedCoffee={updatedProperties => updateCoffee(selectedCoffeeId, updatedProperties)} addCoffee={addCoffee}/>
      <SleepInspector   sleepFrom={sleepFrom} sleepUntil={sleepUntil} setSleepFrom={setSleepFrom} setSleepUntil={setSleepUntil} />

    </div>
  );
}

export default App;
