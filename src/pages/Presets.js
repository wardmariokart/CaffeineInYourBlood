import styles from './../css/presets.module.css';
import Preset from './../components/Preset.js';

const Presets = ({coffeeTypes, createCoffeeFromTypeId, setRouteHome, loadPreset, resetCoffeeStates, activePreset}) => {

    // instruction = [typeName, hour, minute] 
    const createPreset = (title, beverageInstructions, statementStates = []) => {

        const coffees = [];
        beverageInstructions.forEach(instruction => {
            const consumedAt = new Date();
            consumedAt.setHours(instruction.hour, instruction.minute);
            
            const type = coffeeTypes.find(find => find.name === instruction.typeName);
            if (type) {
                const coffeeOfType = createCoffeeFromTypeId(type.baseTypeId);
                coffeeOfType.consumedAt = consumedAt;
                coffees.push(coffeeOfType);
            }
        });

        return {title, coffees, statementStates};
    }

    
    const createPresets = () => {
        const localPresets = [];
        const createBeverageInstruction = (typeName, hour, minute) => {return {typeName, hour, minute};};
        const createStatementState = (statementId, bAgree) => {return {statementId, bAgree};}; 

        localPresets.push(
            createPreset('Casual Carlos',
            [
                createBeverageInstruction('espresso', 8, 0),
                createBeverageInstruction('vanilla latte™', 12, 45),
            ],
            []),
            createPreset('Pumpkin spice Paula',
            [
                createBeverageInstruction('pumpkin spice latte™', 9, 15),
                createBeverageInstruction('vanilla latte™', 11, 30),
                createBeverageInstruction('pumpkin spice latte™', 16, 0),
            ],
            [
                createStatementState (3, true)
            ]),

            createPreset('Herman Brusselmans',
            [
                createBeverageInstruction('kazaar (limit edition)', 10, 45),
                createBeverageInstruction('lungo (capsule)', 13, 0),
                createBeverageInstruction('kazaar (limit edition)', 19, 0),
                createBeverageInstruction('espresso (capsule)', 22, 0),
                createBeverageInstruction('espresso (capsule)', 23, 55),
            ],
            [
                createStatementState (1,true),
                createStatementState (2, true)
            ]),
            createPreset('Careful Carolien',
            [
                createBeverageInstruction('iced white chocolate mocha™', 10, 45),
            ],
            [
                createStatementState (4,true)
            ]),
            createPreset('Energy Enrique',
            [
                createBeverageInstruction('red bull', 11, 0),
                createBeverageInstruction('red bull', 13, 30),
            ],
            [
                createStatementState (1,true)
            ]),
        );      
        
        // assign id's
        localPresets.forEach((preset, idx) => preset.id = idx);

        return localPresets;
    }

    const presets = createPresets();

    const presetsJsx = presets.map(preset => ( 
            <Preset 
                key={preset.id}
                bActive={activePreset ? activePreset.id === preset.id : false}
                title={preset.title}
                coffees={preset.coffees}
                setRouteHome={setRouteHome}
                selectPreset={() => loadPreset(preset)}
                deselectPreset={() => {resetCoffeeStates();}}
            />
        )
    );

    return ( 
        <div className={styles.page}>
            <h1 className={styles.title}>Presets</h1>
            {presetsJsx}
        </div>
    );
}

export default Presets;