import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './../css/clearance.module.css';
import { TIME } from './../helpers.js';
import Statement from './Statement.js';

const Clearance = ({statementStates, setStatementState, baseHalfLife, halfLifeMin , setHalfLifeMin}) => {

    const [statements, setStatements] = useState([
        {
            id: 1,
            title: 'statement #1', 
            body: 'I drink one ore two alcoholic beverages a day',
            disagreeTip: '+ 0% half life duration',
            agreeTip: '+72% half life duration',
            effect: 0.72,
        },
        {
            id: 2,
            title: 'statement #2', 
            body: 'I am a smoker',
            disagreeTip: '+ 0% half life duration',
            agreeTip: '-50% half life duration',
            effect: -0.5,
        },
        {
            id: 3,
            title: 'statement #3', 
            body: 'I am currently taking oral contraceptives',
            disagreeTip: '+ 0% half life duration',
            agreeTip: '+90% half life duration',
            effect: 0.9,
        },
        {
            id: 4,
            title: 'statement #4', 
            body: 'I am pregnant',
            disagreeTip: '+ 0% half life duration',
            agreeTip: '+72% half life duration',
            effect: 0.25,
        }
    ]);

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
        agreeTip={statement.agreeTip}
        disagreeTip={statement.disagreeTip}
        setAgree={(bAgree) => setStatementState(statement.id, bAgree)}
        bAgree={state ? state.bAgree : false}
        effect={statement.effect}
        />
    });

    return (
        <section className={styles.clearance}>
            <h2>Caffeine half life: {Math.floor(halfLifeMin / TIME.minutesInHour).toFixed(0)} hours and {(halfLifeMin - Math.floor(halfLifeMin / TIME.minutesInHour) * TIME.minutesInHour).toFixed(0)} minutes</h2>
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