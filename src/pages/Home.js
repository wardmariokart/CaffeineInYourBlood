import styles from './../css/home.module.css';
import  { useState } from 'react';
import CoffeeInspector from './../components/CoffeeInspector.js';
import Overview from './../components/Overview.js';
import SleepInspector from './../components/SleepInspector.js';
import Clearance from './../components/Clearance.js';
import DailyCaffeine from './../components/DailyCaffeine.js';
import { TIME } from './../helpers.js';

import iconEspresso from '../assets/svg/espresso.svg';
import iconDoppio from '../assets/svg/doppio.svg';
import iconLatte from '../assets/svg/moka-pot.svg';
import { timeline } from 'animejs';

const Home = () => {

  // TEMP
  // eslint-disable-next-line
  const coffeeTypes = [
    {
      baseTypeId: 1,
      name: 'espresso',
      sizeMl: 30,
      caffeineMgPerMl: 1.3,
      imagePath: iconEspresso,
      deltaSizeMl: 5,
    },
    {
      baseTypeId: 2,
      name: 'doppio',
      sizeMl: 60,
      caffeineMgPerMl: 1.3,
      imagePath: iconDoppio,
      deltaSizeMl: 5,
    },
    {
      baseTypeId: 3,
      name: 'latte',
      sizeMl: 475,
      caffeineMgPerMl: 0.33,
      imagePath: iconLatte,
      deltaSizeMl: 25,
    }
  ]
  const exampleCoffee = {id: undefined, baseTypeId: undefined, name: undefined, caffeineMgPerMl: undefined, sizeMl: undefined, consumedAt: undefined, deltaSizeMl: undefined};

  /* ___________________________________________________________ COFFEES  */
  const [coffees, setCoffees] = useState([]);

  const addEmptyCoffee = () => {
    const coffeesClone = [...coffees];

    const randomHour = Math.floor(Math.random() * 10);
    const randomMinute = Math.floor(Math.random() * 59);
    const date = new Date();
    date.setHours(randomHour, randomMinute,0,0);
  
    const newCoffee = {id: coffeesClone.length + 1, bInCreation: true, consumedAt: date};
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

  const getCoffeeTypeById = (typeId) => {
    const typeIndex = coffeeTypes.findIndex(find => find.baseTypeId === typeId);
    if (typeIndex !== -1) {
      const typeCopy = {...coffeeTypes[typeIndex]};
      typeCopy.baseSizeMl = typeCopy.sizeMl;
      typeCopy.baseCaffeineMgPerMl = typeCopy.caffeineMgPerMl;
      return typeCopy;
    }
    console.log(`[App.js::getCoffeeTypeById] Error: TypeId '${typeId}' is invalid.`)
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

  const setCoffeeSizeMl = (coffeeId, sizeMl) => {
    console.log({sizeMl});
    updateCoffee(coffeeId, {sizeMl: Math.max(sizeMl, 0)});
  } 

  const setCoffeeCaffeineMgPerMl = (coffeeId, caffeineMgPerMl) => {
    updateCoffee(coffeeId, {caffeineMgPerMl: Math.max(caffeineMgPerMl, 0)});
  }

  const setCoffeeType = (coffee, typeId) => {
    // Every newly created coffee (from addEmptyCoffee()) needs to pass trough this function
    const index = coffees.findIndex(find => find.id === coffee.id);
    const typeInstance = getCoffeeTypeById(typeId);
    if (typeInstance !== false && index !== -1) {

      // 1. Create cloned coffee with new type
      const {['id']: baseTypeId, sizeMl, name, caffeineMgPerMl, imagePath, deltaSizeMl} = typeInstance; // properties to copy from typeInstance
      let merged = {...coffee,bInCreation: false,  baseTypeId, sizeMl, name, caffeineMgPerMl, imagePath};

      merged = {...coffee, ...typeInstance, bInCreation: false}; // Remove baseTypeId if this works!!!!!
      console.log({typeInstance});
      // 2. Update in coffees array
      const tmp = [...coffees];
      tmp[index] = merged;
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


    /* ___________________________________________________________ CAFFEINE HALF LIFE  */
  const [halfLifeMin, setHalfLifeMin] = useState(6 * TIME.minutesInHour);

  const [sleepFrom, setSleepFrom] = useState({hours: 23, minutes: 15});
  const [sleepUntil, setSleepUntil] = useState({hours: 7, minutes: 0});

  return (
    <div className={styles.home}>
      <div className={styles.content}>
        <Overview
          selectedCoffee={selectedCoffee()}
          coffees={coffees.filter(filter => !filter.bInCreation)}
          selectCoffeeById={selectCoffeeById}
          sleepFrom={sleepFrom}
          sleepUntil={sleepUntil}
          halfLifeMin={halfLifeMin}
        />

        <div class={styles.inspectors}>
          <CoffeeInspector  
            selectedCoffee={selectedCoffee()}
            coffeeTypes={coffeeTypes}
            setCoffeeType={setCoffeeType}
            updateCoffee={updateCoffee} 
            setCoffeeSizeMl={setCoffeeSizeMl}
            setCoffeeCaffeineMgPerMl={setCoffeeCaffeineMgPerMl}
            addEmptyCoffee={addEmptyCoffee}
            removeCoffee={removeCoffee}
          />
          <div class={styles.inspectorBars}>
            <DailyCaffeine coffees={coffees.filter(filter => !filter.bInCreation)}/>
            <Clearance
              baseHalfLife={6 * TIME.minutesInHour}
              halfLifeMin={halfLifeMin}
              setHalfLifeMin={setHalfLifeMin}
            />
            <SleepInspector   sleepFrom={sleepFrom} sleepUntil={sleepUntil} setSleepFrom={setSleepFrom} setSleepUntil={setSleepUntil} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
