import iconEspresso from './../svg/espresso.svg';
import iconDoppio from './../svg/doppio.svg';
import iconLatte from './../svg/moka-pot.svg';

export const BEVERAGECATEGORIES = {
    NORMAL: 0,
    CAPSULE: 1,
    STARBUCKS: 2,
    NONCOFEE: 3
}

const BEVERAGETYPES = [
    {
        baseTypeId: 1,
        name: 'espresso',
        sizeMl: 30,
        caffeineMgPerMl: 1.33,
        imagePath: iconEspresso,
        deltaSizeMl: 5,
        deltaCaffeineMgPerMl: 0.1,
        category: BEVERAGECATEGORIES.NORMAL
    },
    {
        baseTypeId: 2,
        name: 'doppio',
        sizeMl: 60,
        caffeineMgPerMl: 1.33,
        imagePath: iconDoppio,
        deltaSizeMl: 5,
        deltaCaffeineMgPerMl: 0.1,
        category: BEVERAGECATEGORIES.NORMAL
    },
    {
        baseTypeId: 3,
        name: 'cappuccino',
        sizeMl: 150,
        caffeineMgPerMl: 0.41,
        imagePath: iconDoppio,
        deltaSizeMl: 5,
        deltaCaffeineMgPerMl: 0.1,
        category: BEVERAGECATEGORIES.NORMAL
    },
    {
        baseTypeId: 4,
        name: 'latte',
        sizeMl: 240,
        caffeineMgPerMl: 0.3,
        imagePath: iconDoppio,
        deltaSizeMl: 5,
        deltaCaffeineMgPerMl: 0.1,
        category: BEVERAGECATEGORIES.NORMAL
    },
    {
        baseTypeId: 5,
        name: 'espresso (capsule)',
        sizeMl: 30,
        caffeineMgPerMl: 2,
        imagePath: iconEspresso,
        deltaSizeMl: 5,
        deltaCaffeineMgPerMl: 0.1,
        category: BEVERAGECATEGORIES.CAPSULE
    },
    {
        baseTypeId: 6,
        name: 'lungo (capsule)',
        sizeMl: 60,
        caffeineMgPerMl: 0.88,
        imagePath: iconEspresso,
        deltaSizeMl: 5,
        deltaCaffeineMgPerMl: 0.1,
        category: BEVERAGECATEGORIES.CAPSULE
    },
    {
        baseTypeId: 7,
        name: 'kazaar (limit edition)',
        sizeMl: 30,
        caffeineMgPerMl: 4.16,
        imagePath: iconEspresso,
        deltaSizeMl: 5,
        deltaCaffeineMgPerMl: 0.1,
        category: BEVERAGECATEGORIES.CAPSULE
    },
    {
        baseTypeId: 8,
        name: 'vanilla latte™',
        sizeMl: 480,
        caffeineMgPerMl: 0.35,
        imagePath: iconDoppio,
        deltaSizeMl: 120,
        deltaCaffeineMgPerMl: 0.1,
        category: BEVERAGECATEGORIES.STARBUCKS
    },
    {
        baseTypeId: 9,
        name: 'pumpkin spice latte™',
        sizeMl: 480,
        caffeineMgPerMl: 0.3125,
        imagePath: iconDoppio,
        deltaSizeMl: 120,
        deltaCaffeineMgPerMl: 0.1,
        category: BEVERAGECATEGORIES.STARBUCKS
    },
    {
        baseTypeId: 10,
        name: 'iced white chocolate mocha™',
        sizeMl: 480,
        caffeineMgPerMl: 0.3125,
        imagePath: iconDoppio,
        deltaSizeMl: 120,
        deltaCaffeineMgPerMl: 0.1,
        category: BEVERAGECATEGORIES.STARBUCKS
    },
    {
        baseTypeId: 11,
        name: 'green tea',
        sizeMl: 240,
        caffeineMgPerMl: 0.125,
        imagePath: iconDoppio,
        deltaSizeMl: 20,
        deltaCaffeineMgPerMl: 0.1,
        category: BEVERAGECATEGORIES.NONCOFEE
    },
    {
        baseTypeId: 12,
        name: 'black tea',
        sizeMl: 240,
        caffeineMgPerMl: 0.2,
        imagePath: iconDoppio,
        deltaSizeMl: 20,
        deltaCaffeineMgPerMl: 0.1,
        category: BEVERAGECATEGORIES.NONCOFEE
    },
    
    {
        baseTypeId: 13,
        name: 'red bull',
        sizeMl: 250,
        caffeineMgPerMl: 0.3,
        imagePath: iconEspresso,
        deltaSizeMl: 50,
        deltaCaffeineMgPerMl: 0.1,
        category: BEVERAGECATEGORIES.NONCOFEE
    }
];

export default BEVERAGETYPES;