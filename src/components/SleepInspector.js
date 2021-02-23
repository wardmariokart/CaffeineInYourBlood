import {TimeInput} from './TimeInput.js';

export const SleepInspector = ({sleepFrom, sleepUntil, setSleepFrom, setSleepUntil}) => {
    return <section>
        <h2>Sleep section</h2>
        <span>I sleep from
            <TimeInput time={sleepFrom} setTime={setSleepFrom}/>
            to
            <TimeInput time={sleepUntil} setTime={setSleepUntil}/>
        </span>
    </section>;
}