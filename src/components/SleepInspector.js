import {TimeInput2} from './TimeInput2.js';
import Clock from './Clock.js';

export const SleepInspector = ({sleepFrom, sleepUntil, setSleepFrom, setSleepUntil}) => {
    return (
    <section>
        <h2>Sleep section</h2>
        <span>I sleep from
            <Clock/>
            to
            <TimeInput2 time={sleepUntil} setTime={setSleepUntil}/>
        </span>
    </section>
    );
}

export default SleepInspector;