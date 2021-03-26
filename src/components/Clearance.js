import { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import styles from './../css/clearance.module.css';
import { TIME } from '../helpers/helpers.js';
import Statement from './Statement.js';

const Clearance = ({statementStates, setStatementState, baseHalfLife, halfLifeMin , setHalfLifeMin}) => {


    // useMemo is used to avoids doing unnecessary expensive computations every render if the computation should only be done if some variables chagne (instead of every render)
    // Ik gebruik useMemo niet echt voor een dure berekening maar eslint gaf een warning dus heb tip van eslint opgevolgt useMemo opgezocht
    const statements =  useMemo(() => [
        {
            id: 1,
            title: 'statement #1', 
            body: 'I drink one ore two alcoholic beverages a day',
            effect: 0.72,
        },
        {
            id: 2,
            title: 'statement #2', 
            body: 'I am a smoker',
            effect: -0.5,
        },
        {
            id: 3,
            title: 'statement #3', 
            body: 'I am currently taking oral contraceptives',
            effect: 0.9,
        },
        {
            id: 4,
            title: 'statement #4', 
            body: 'I am pregnant',
            effect: 0.25,
        }
    ],[]);

    // Deze useEffect kan vermeden worden door onderstaande functionaliteit en 'statements' variable aan app.js toe te voegen
    // Ik koos om dit niet te doen en seperation of concerns in het achterhoofd te houden
    // Na dit uitgeschreven te hebben ben niet volledig overtuigd (maar ik wil app.js niet nog meer vervuilen.)
    useEffect(() => {
        let halfLife = baseHalfLife;
        const method1 = true;
        if(method1) {
            let multiplier = 1;
            statements.forEach(statement => {
                const state = statementStates.find(find => find.statementId === statement.id);
                const bAgree = state ? state.bAgree : false;
                multiplier *= 1 + (bAgree ? (statement.effect) : 0); 
            })
            halfLife = baseHalfLife * multiplier;
        }
    
        setHalfLifeMin(halfLife);
    }, [statementStates, statements, baseHalfLife, setHalfLifeMin]);

    
    const statementsJsx = statements.map(statement => {

        const state = statementStates.find(find => find.statementId === statement.id);
    
        return <Statement
        key={statement.id}
        title={statement.title}
        body={statement.body}
        setAgree={(bAgree) => setStatementState(statement.id, bAgree)}
        bAgree={state ? state.bAgree : false}
        effect={statement.effect}
        />
    });

    return (
        <section className={styles.clearance}>
            <div className={styles.head}>
                <h2 className={styles.title}>Caffeine half life:</h2>

                {baseHalfLife !== halfLifeMin && <><span className={styles.strikethrough}><span className={styles.halfLifeNumber}>{Math.floor(baseHalfLife / TIME.minutesInHour).toFixed(0)}</span> hours <span className={styles.halfLifeNumber}>{(baseHalfLife - Math.floor(baseHalfLife / TIME.minutesInHour) * TIME.minutesInHour).toFixed(0)}</span> minutes</span><span className={styles.arrow}></span></>}
                <span className={styles.halfLife}><span className={styles.halfLifeNumber}>{Math.floor(halfLifeMin / TIME.minutesInHour).toFixed(0)}</span> hours <span className={styles.halfLifeNumber}>{(halfLifeMin - Math.floor(halfLifeMin / TIME.minutesInHour) * TIME.minutesInHour).toFixed(0)}</span> minutes</span>
            </div>
            <div className={styles.statements}> 
                {statementsJsx}
            </div>
        </section>
    );
}

Clearance.defaultProps = {
    baseHalfLife: 6 * TIME.minutesInHour,
}

Clearance.propTypes = { 
    halfLifeMin: PropTypes.number.isRequired,
    setHalfLifeMin: PropTypes.func.isRequired,
    baseHalfLife: PropTypes.number,
}

export default Clearance;