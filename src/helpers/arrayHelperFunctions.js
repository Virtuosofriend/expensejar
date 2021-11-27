import categories from "./expensesCategories";

const properNumberRound = number => {
    return Math.round( ( number + Number.EPSILON ) * 100 ) / 100
};

export const reducer = array => {
    return array.reduce((accumulator, cur) => {
        let category = cur.category;
        let found = accumulator.find(elem => elem.category === category);
        if ( found ) {
            found.amount += cur.amount;
            found.amount = properNumberRound(found.amount)
        } else {
            accumulator.push(cur);
        }
        return accumulator;
    }, []);
};

export const constructData = reducerArray => {
    let categoriesArray = categories.map( elem => {
        return {
            category: elem,
            amount:   0
        };
    });
    
    let result = categoriesArray.map((elem, index) => {
        let findElement = reducerArray.find(ownerItem => ownerItem.category == elem.category );
        if ( findElement ) {
            return {
                category:   elem.category,
                amount:     findElement.amount
            }
        }
        return elem;
    });

    return result;
};

export const sumArrayElements = array => {
    let amount = 0
    for (let value of array ) {
        amount += value.amount;
    }
    return Math.floor(amount * 100) / 100 ;
};