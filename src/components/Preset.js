import styles from './../css/preset.module.css';
import PropTypes from 'prop-types';
import { leadingZeros, shortenString } from '../helpers/helpers.js';

const Preset = ({title, coffees, bActive, selectPreset, deselectPreset, setRouteHome}) => {

    const coffeesJsx = coffees.map((coffee, idx) => (
        <div key={idx} className={styles.coffee}>
            <img className={styles.coffeeIcon} src={coffee.imagePath} alt={`${coffee.name} icon`}></img>
            <div>
                <p className={styles.coffeeTitle}>{shortenString(coffee.name, 10)}</p>
                <p className={styles.coffeeTime}>{`${leadingZeros(coffee.consumedAt.getHours(), 2)}:${leadingZeros(coffee.consumedAt.getMinutes(), 2)}`}</p>
            </div>
        </div>
    ));

    const inactiveControlsJsx = (
        <>
            <button className={styles.controlsActivate} onClick={selectPreset}>Load preset</button>
        </>
    );
    
    const activeControlsJsx = (
        <>
            <span className={styles.controlsText}>Preset is active!</span>
            <div className={styles.controlsActivateButtons}>

                <button className={styles.controlsActivate} onClick={deselectPreset}>x</button>
                <button className={styles.controlsActivate} onClick={setRouteHome}>Go to graph</button>
            </div>
        </>
    );
    return (
        <article className={`${styles.preset} ${bActive ? styles.active : ''}`}>
            <h3 className={`${styles.title}`}>{title}</h3>
            <div className={`${styles.container} ${styles.statedBorderColor}`}>
                <div className={styles.containerCoffees}>
                    {coffeesJsx}
                </div>
                <div className={`${styles.containerControls} ${styles.statedBorderColor}`}>
                    {bActive ? activeControlsJsx : inactiveControlsJsx}
                </div>
            </div>
        </article>
    )
}
Preset.defaultProps = {
    title: 'Preset',
    coffees: [],
    bActive: false,
};

Preset.propTypes = {
    title: PropTypes.string.isRequired,
    coffees: PropTypes.array,
    bActive: PropTypes.bool
};


export default Preset;