import './DailyCaffeine.css';

const DailyCaffeine = ({coffees, dailyLimit}) => {
    
    // 'Position' is in percentage relative to full bar width
    // 'Value' is the actual mg
    const barValue = coffees.reduce((acc, coffee) => acc + coffee.sizeMl * coffee.caffeineMgPerMl, 0);
    const dailyLimitPosition = 0.75;
    const maxValueMg = ((1 - dailyLimitPosition) / dailyLimitPosition + 1) * dailyLimit;
    const barPosition = barValue / maxValueMg 

    const barWidthPx = '600'; // Question: Ik wil width laten afhangen van grid. Hoe krijg ik de width in px dan? 

    // on mg


    const markIntervalMg = 25;
    const markIntervalPx = markIntervalMg/maxValueMg * barWidthPx;
    const bigMarkInteval = 4; // Every 4th mark is big
    let marks = Array(Math.floor(barWidthPx/markIntervalPx) + 1).fill(null);
    marks = marks.map((e, i) => <div key={i} className={`bar__marks__mark${i%bigMarkInteval === 0 ? '--big': ''}`} style={{left: `${markIntervalPx * i}px`}}></div>);
    
    return (
        <section className='daily-caffeine'>
            <h2>Daily caffeine intake: {barValue}mg</h2>
            <div className='daily-caffeine__container' style={{width: `${barWidthPx}px`}}>
                <div className='bar__marks'>
                    {marks}
                </div>
                <div className='daily-caffeine__container__bar'>    {/* Question: Hier weet ik niet goed hoe ik dit een defitge BEM naam geef */}
                    <div className='bar__fill' style={{width: `${barPosition*100}%`, height: '100%'}}></div>
                    <div className='bar__limit' style={{width: `${dailyLimitPosition*100}%`}}></div>
                    <div className='bar__outline'></div>
                </div>
                <div>
                    
                </div>
            </div>

        </section>
    )
};

DailyCaffeine.defaultProps = {
    coffees: [],
    dailyLimit: 250
}

export default DailyCaffeine;