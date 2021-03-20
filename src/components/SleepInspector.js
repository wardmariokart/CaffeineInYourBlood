import styles from './../css/sleepInspector.module.css';

export const SleepInspector = ({sleepFrom, sleepUntil, setSleepFrom, setSleepUntil}) => {

    

    return (
    <section className={styles.inspector}>
        <h2>Sleep section</h2>
        <span style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
            I sleep from 
           
            untill
          
        </span>
       
       
    </section>
    );
}

export default SleepInspector;