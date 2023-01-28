export const properNumberRound = number => {
    return Math.round( ( number + Number.EPSILON ) * 100 ) / 100
};