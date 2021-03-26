import styles from './../css/home.module.css';
import  { useState } from 'react';
import { TIME } from '../helpers/helpers.js';

// Components
import CoffeeInspector from './../components/CoffeeInspector.js';
import Overview from './../components/Overview.js';
import Clearance from './../components/Clearance.js';
import DailyCaffeine from './../components/DailyCaffeine.js';

const Home = ({coffees, coffeeTypes, selectedCoffee, removeCoffee, addEmptyCoffee, setCoffeeSizeMl, setCoffeeCaffeineMgPerMl, updateCoffee, setCoffeeType, selectCoffeeById, statementStates, setStatementState}) => {
  
  /* ___________________________________________________________ CAFFEINE HALF LIFE  */
  const [halfLifeMin, setHalfLifeMin] = useState(6 * TIME.minutesInHour);

  return (
    <div className={styles.home}>
      <div className={styles.content}>
        <Overview
          selectedCoffee={selectedCoffee}
          coffees={coffees.filter(filter => !filter.bInCreation)}
          selectCoffeeById={selectCoffeeById}
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
