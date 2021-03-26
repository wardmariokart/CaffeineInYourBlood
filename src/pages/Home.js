import styles from './../css/home.module.css';
import  { useState } from 'react';
import CoffeeInspector from './../components/CoffeeInspector.js';
import Overview from './../components/Overview.js';
import SleepInspector from './../components/SleepInspector.js';
import Clearance from './../components/Clearance.js';
import DailyCaffeine from './../components/DailyCaffeine.js';
import { TIME } from './../helpers.js';

const Home = ({coffees, coffeeTypes, selectedCoffee, removeCoffee, addEmptyCoffee, setCoffeeSizeMl, setCoffeeCaffeineMgPerMl, updateCoffee, setCoffeeType, selectCoffeeById, statementStates, setStatementState}) => {

  
  /* ___________________________________________________________ CAFFEINE HALF LIFE  */
  const [halfLifeMin, setHalfLifeMin] = useState(6 * TIME.minutesInHour);

  const [sleepFrom, setSleepFrom] = useState({hours: 23, minutes: 15});
  const [sleepUntil, setSleepUntil] = useState({hours: 7, minutes: 0});

  return (
    <div className={styles.home}>
      <div className={styles.content}>
        <Overview
          selectedCoffee={selectedCoffee}
          coffees={coffees.filter(filter => !filter.bInCreation)}
          selectCoffeeById={selectCoffeeById}
          sleepFrom={sleepFrom}
          sleepUntil={sleepUntil}
          halfLifeMin={halfLifeMin}
        />

        <div className={styles.inspectors}>
          <CoffeeInspector  
            selectedCoffee={selectedCoffee}
            coffeeTypes={coffeeTypes}
            setCoffeeType={setCoffeeType}
            updateCoffee={updateCoffee} 
            setCoffeeSizeMl={setCoffeeSizeMl}
            setCoffeeCaffeineMgPerMl={setCoffeeCaffeineMgPerMl}
            addEmptyCoffee={addEmptyCoffee}
            removeCoffee={removeCoffee}
          />
          <div className={styles.inspectorBars}>
            <DailyCaffeine coffees={coffees.filter(filter => !filter.bInCreation)}/>
            <Clearance
              baseHalfLife={6 * TIME.minutesInHour}
              halfLifeMin={halfLifeMin}
              setHalfLifeMin={setHalfLifeMin}
              statementStates={statementStates}
              setStatementState={setStatementState}
            />
            {/* <SleepInspector   sleepFrom={sleepFrom} sleepUntil={sleepUntil} setSleepFrom={setSleepFrom} setSleepUntil={setSleepUntil} /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
