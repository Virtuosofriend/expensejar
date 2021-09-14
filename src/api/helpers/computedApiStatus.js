import { apiStatus } from "../constants/apiStatus";

export const apiStatusComputed = ( reactivePropertyKeys = "" ) => {
    let computed = {};

    const properties = Array.isArray(reactivePropertyKeys)
    ? reactivePropertyKeys
    : [reactivePropertyKeys];

    for (const reactivePropertyKey of properties) {
        for ( const [statusKey, statusValue] of Object.entries(apiStatus) ) {
            computed[`${reactivePropertyKey}_${statusKey}`] = function() {
                return this[reactivePropertyKey] === statusValue;
            }
        }
    }

    return computed;
}