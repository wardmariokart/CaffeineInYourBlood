import './App.css';
import  {useState} from 'react';
import {CoffeeInspector} from './components/CoffeeInspector.js';
import Overview from './components/Overview.js';
import SleepInspector from './components/SleepInspector.js';
import Clearance from './components/Clearance.js';
import DailyCaffeine from './components/DailyCaffeine.js';


const App = () => {

  // TEMP
  // eslint-disable-next-line
  const coffeeTypes = [
    {
      id: 1,
      name: 'espresso',
      sizeMl: 30,
      caffeineMgPerMl: 1.3,
      imagePath: 'https://image.flaticon.com/icons/png/512/68/68909.png'
    },
  {
      id: 2,
      name: 'doppio',
      sizeMl: 60,
      caffeineMgPerMl: 1.3,
      imagePath: 'https://image.flaticon.com/icons/png/512/68/68909.png'
    },
    {
      id: 3,
      name: 'latte',
      sizeMl: 475,
      caffeineMgPerMl: 0.33,
      imagePath: 'https://image.flaticon.com/icons/png/512/68/68909.png'
    }
  ]
  const exampleCoffee = {id: undefined, baseTypeId: undefined, name: undefined, caffeineMgPerMl: undefined, sizeMl: undefined};
  
  /* ___________________________________________________________ COFFEES  */
  const [coffees, setCoffees] = useState([]);

  const addEmptyCoffee = () => {
    const coffeesClone = [...coffees];
    const newCoffee = {id: coffeesClone.length + 1, bInCreation: true};
    coffeesClone.push(newCoffee);
    setCoffees(coffeesClone);
    selectCoffeeById(newCoffee.id);
  }

  // Use this function instead of setSelectCoffeeId! 
  const selectCoffeeById = (coffeeId) => {

    if (selectedCoffeeId !== null) {
      const old = coffees[coffees.findIndex(find => find.id === selectedCoffeeId)];
      if (old.bInCreation) {
        removeCoffeeById(old);
      }
    }
    setSelectedCoffeeId(coffeeId);
  }

  const removeCoffeeById = (coffeeId) => {
    const index = coffees.findIndex(find => find.id === coffeeId);
    if (index !== -1) {
      if (selectedCoffeeId === coffeeId) {
          setSelectedCoffeeId(null);   // TODO: THIS HAS ISSUES FIGURE IT OUT
      }
      const clone = [...coffees];
      clone.splice(index, 1);
      setCoffees(clone);
    }
  }
  
  const removeCoffee = (coffee) => removeCoffeeById(coffee.id);

  const constructCoffeeByTypeId = (typeId) => {
    const typeIndex = coffeeTypes.findIndex(find => find.id === typeId);

    if (typeIndex !== -1) {
      const type = coffeeTypes[typeIndex]

      const coffee = {...exampleCoffee};
      coffee.name = type.name;
      coffee.sizeMl = type.sizeMl;
      coffee.caffeineMgPerMl = type.caffeineMgPerMl;
      coffee.baseTypeId = typeId;
      coffee.imagePath = type.imagePath;
      return coffee;
    }
    console.log(`[App.js::constructCoffeeByTypeId] Error: TypeId '${typeId}' is invalid.`)
    return false;
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

  const setCoffeeType = (coffee, typeId) => {
    // Every newly created coffee needs to pass trough this function

    const newCoffee = constructCoffeeByTypeId(typeId);
    const index = coffees.findIndex(find => find.id === coffee.id);
    if (newCoffee !== false && index !== -1) {
      newCoffee.id = coffee.id;
      newCoffee.bInCreation = false;
      const tmp = [...coffees];
      tmp[index] = newCoffee;
      setCoffees(tmp);
    } else {
      console.log(`[App.js::setCoffeeType] Error: coffee type has not been updated`);
    }
  }



  /* ___________________________________________________________ SELECTED COFFEE  */
  const [selectedCoffeeId, setSelectedCoffeeId] = useState(null);
  const selectedCoffee = () => {
    const index = coffees.findIndex(check => check.id === selectedCoffeeId);
    return index === -1 ? null : coffees[index];
  };


  const [sleepFrom, setSleepFrom] = useState({hours: 23, minutes: 15});
  const [sleepUntil, setSleepUntil] = useState({hours: 7, minutes: 0});

  return (
    <div className='app'>
      <header className='app__header'>
        <h1>How much caffeine is in my blood?</h1>
      </header>
      <div className='app__content'>
        <Overview
          selectedCoffee={selectedCoffee()}
          coffees={coffees.filter(filter => !filter.bInCreation)}
          selectCoffeeById={selectCoffeeById}
          sleepFrom={sleepFrom}
          sleepUntil={sleepUntil}
        />
        <CoffeeInspector  
          selectedCoffee={selectedCoffee()}
          coffeeTypes={coffeeTypes}
          setCoffeeType={setCoffeeType}
          CoffeeupdateSelectedCoffee={updatedProperties => updateCoffee(selectedCoffeeId, updatedProperties)} 
          addEmptyCoffee={addEmptyCoffee}
          removeCoffee={removeCoffee}
        />
        <DailyCaffeine coffees={coffees.filter(filter => !filter.bInCreation)}/>
        <Clearance/>
        <SleepInspector   sleepFrom={sleepFrom} sleepUntil={sleepUntil} setSleepFrom={setSleepFrom} setSleepUntil={setSleepUntil} />
      </div>
    </div>
  );
}

export default App;
