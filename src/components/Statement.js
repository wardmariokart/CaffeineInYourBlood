import styles from './../css/statement.module.css';
import { useState } from 'react';
import PropTypes from 'prop-types';

const Statement = ({title, body, agreeTip, disagreeTip, setAgree, bAgree, effect}) => {

    return (
        <article className={`${styles.statement} ${bAgree ? styles.statementAgree : styles.statementDisagree}`} onClick={() => setAgree(!bAgree)}>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.body}>{body}</p>
            <div className={styles.bottom}>
                <div className={styles.iconWrapper}>
                    <div className={`${styles.icon} ${bAgree ? styles.iconAgree : styles.iconDisagree}`}></div>
                </div>
                {<p key={`agree_${bAgree}`} className={styles.tip}>
                    {bAgree ? `${(Math.abs(effect) * 100).toFixed(0)}% ${effect < 0 ? 'shorter' : 'longer'} half life` 
                    :
                    'No effect'}
                    </p> }
            </div>
        </article>
    )
}

Statement.defaultProps = {
    title: 'Sample Title',
    body: 'Sample body',
    agreeTip: 'Sample bAgree tip',
    disagreeTip: 'Sample disagree tip'
}

Statement.propTypes = {
    title: PropTypes.string,
    body: PropTypes.string,
    agreeTip: PropTypes.string,
    disagreeTip: PropTypes.string
}

export default Statement;