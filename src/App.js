import { Route, Switch, useHistory } from 'react-router-dom';
import { ROUTES } from './consts/index.js';
import Nav from './components/Nav.js';
import Home from './pages/Home.js';
import About from './pages/About.js';
import Presets from './pages/Presets.js';
import styles from './css/app.module.css';
import { useState } from 'react';
import { randomElement } from './helpers.js';
import coffeeTypes from './assets/data/beverageTypes.js';

import iconEspresso from './assets/svg/espresso.svg';
import iconDoppio from './assets/svg/doppio.svg';
import iconLatte from './assets/svg/moka-pot.svg';
import { random } from 'animejs';

const App = () => {

  const exampleCoffee = {id: undefined, baseTypeId: undefined, name: undefined, caffeineMgPerMl: undefined, sizeMl: undefined, consumedAt: undefined, deltaSizeMl: undefined};

  /* ___________________________________________________________ COFFEES  */
  const [coffees, setCoffees] = useState([]);

  const addEmptyCoffee = () => {
    const coffeesClone = [...coffees];

    const randomHour = Math.floor(Math.random() * 10) + 6;
    const randomMinute = Math.floor(Math.random() * 59);
    const date = new Date();
    date.setHours(randomHour, randomMinute,0,0);
  
    const newCoffee = {id: coffeesClone.length + 1, bInCreation: true, consumedAt: date};
    coffeesClone.push(newCoffee);
    setCoffees(coffeesClone);
    selectCoffeeById(newCoffee.id);
  }

  const replaceCoffees = (replacementCoffees) => {
    
    const updatedCoffees = [];
    replacementCoffees.forEach(coffee => {

      const mustHaveProperties = Object.keys(exampleCoffee);
      const missingFields = [];
      mustHaveProperties.forEach(propertyKey => {if(!(propertyKey in coffee)) missingFields.push(propertyKey);});
      
      const bValidCoffee = missingFields.length === 0;

      if (bValidCoffee) {
        const id = updatedCoffees.length + 1;
        updatedCoffees.push({...coffee, id});
      } else {
        
        console.log('--Tried to add a coffee but it was deemed invalid. Missing fields:')
        console.log({coffee});
        console.log({missingFields});
        console.log('--end of error');
      }
    });

    setCoffees(updatedCoffees);
  };

  const removeCoffeeById = (coffeeId) => {
    const index = coffees.findIndex(find => find.id === coffeeId);
    if (index !== -1) {
      if (selectedCoffeeId === coffeeId) {
          
        let newSelectedId = null;
        const candidates = coffees.filter(filter => filter.id !== coffeeId && !filter.bInCreation)
        if (candidates.length > 0) {
          newSelectedId = randomElement(candidates).id;
        }
        setSelectedCoffeeId(newSelectedId);
          // 
      }
      const clone = [...coffees];
      clone.splice(index, 1);
      setCoffees(clone);
    }
  };
  
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
  };

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
  };

  const setCoffeeSizeMl = (coffeeId, sizeMl) => {
    console.log({sizeMl});
    updateCoffee(coffeeId, {sizeMl: Math.max(sizeMl, 0)});
  };

  const setCoffeeCaffeineMgPerMl = (coffeeId, caffeineMgPerMl) => {
    updateCoffee(coffeeId, {caffeineMgPerMl: Math.max(caffeineMgPerMl, 0)});
  };

  const setCoffeeType = (coffee, typeId) => {
    // Every newly created coffee (from addEmptyCoffee()) needs to pass trough this function
    const typeInstance = getCoffeeTypeById(typeId);

    let clone = {};
    if (typeInstance !== false) {
      clone = {...coffee, ...typeInstance, bInCreation: false};
    }

    // Update coffees if necessary;
    if (coffee.id !== null) {
      const index = coffees.findIndex(find => find.id === coffee.id);
      const bUpdateState = index !== -1;
      if (bUpdateState) {
        const tmp = [...coffees];
        tmp[index] = clone;
        setCoffees(tmp);
      }
    }
    return clone;
  }

  const createCoffeeFromTypeId = (typeId) => {
    let coffee = {...exampleCoffee};
    coffee = setCoffeeType(coffee, typeId);
    console.log(`Stand alone coffee (no state)`);
    console.log({coffee})

    return coffee;
  }

  /* ___________________________________________________________ SELECTED COFFEE  */
  const [selectedCoffeeId, setSelectedCoffeeId] = useState(null);
  const selectedCoffee = () => {
    const index = coffees.findIndex(check => check.id === selectedCoffeeId);
    return index === -1 ? null : coffees[index];
  };

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
  

  /* ___________________________________________________________ PRESET  */
  const [activePreset, setActivePreset] = useState(null);
  
  const loadPreset = (preset) => {
    // Update coffees.
    replaceCoffees(preset.coffees);
    // Update selected coffee
    if(preset.coffees.length > 0) {
      const selectId = preset.selectedCoffeeId ?? 1;
      selectCoffeeById(selectId);
    }
    // Update statements
    setStatementStates(preset.statementStates);

    setActivePreset(preset); // preset is never altered, so should it be copied?
  };

  const resetCoffeeStates = () => {
    replaceCoffees([]);
    setSelectedCoffeeId(null);
    setActivePreset(null);
    // Statements
  };
  /* ___________________________________________________________ STATEMENTS */
  // {statementId: number, bAgree:bool}
  const [statementStates, setStatementStates] = useState([]);
  const setStatementState = (statementId, bAgree) => {
    // check if in array

    console.log(`Call : statementId:${statementId}. bAgree${bAgree}`);

    let clone = [...statementStates];

    const index = clone.findIndex(find => find.statementId === statementId);
    if (index !== -1) {
      const statementElement = {...statementStates[index]};
      statementElement.bAgree = bAgree;
      clone.splice(index, 1, statementElement);
    } else {
      clone.push({statementId, bAgree});
    }

    clone = clone.filter(el => el.bAgree);
    console.log({clone});
    setStatementStates(clone);
  }


  /* ___________________________________________________________ HISTORY  */
  const history = useHistory();

  /* ___________________________________________________________ JSX  */
  return (
    <div className={styles.app}>
      <Nav/>
      <Switch>
        <Route path={ROUTES.ABOUT}>
          <About/>
        </Route>

        <Route path={ROUTES.PRESETS}>
          <Presets
            activePreset={activePreset}
            loadPreset={loadPreset}
            setRouteHome={() => history.push(ROUTES.HOME)}
            resetCoffeeStates={resetCoffeeStates}
            coffeeTypes={coffeeTypes}
            createCoffeeFromTypeId={createCoffeeFromTypeId}
          />
        </Route>
        <Route path={ROUTES.HOME}>
          <Home
            coffees={coffees}
            selectCoffeeById={selectCoffeeById}
            selectedCoffee={selectedCoffee()}
            coffeeTypes={coffeeTypes}
            removeCoffee={(coffee)                                  => {setActivePreset(null); removeCoffee(coffee);}}
            setCoffeeSizeMl={(coffeeId, sizeMl)                      => {setActivePreset(null); setCoffeeSizeMl(coffeeId, sizeMl);}}
            setCoffeeCaffeineMgPerMl={(coffeeId, caffeineMgPerMl)   => {setActivePreset(null); setCoffeeCaffeineMgPerMl(coffeeId, caffeineMgPerMl);}}
            setCoffeeType={(coffee, typeId)                         => {setActivePreset(null); setCoffeeType(coffee, typeId);}}
            updateCoffee={(coffeeId, updatedProperties)             => {setActivePreset(null); updateCoffee(coffeeId, updatedProperties);}}
            addEmptyCoffee={()                                      => {setActivePreset(null); addEmptyCoffee();}}
            setStatementState={(statementId, bAgree)                => {setActivePreset(null); setStatementState(statementId, bAgree);}}
            statementStates={statementStates}
          />
        </Route>
      </Switch>
      <div className={styles.footer}></div>
    </div>
  )
}

export default App;