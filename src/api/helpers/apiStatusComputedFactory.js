import { apiStatus } from "../constants/apiStatus";

export const apiStatusComputedFactory = (reactivePropertyKeys = []) => {
    const computed = {};

    const properties = Array.isArray(reactivePropertyKeys)
        ? reactivePropertyKeys
        : [reactivePropertyKeys];

    for (const reactivePropertyKey of properties) {
        for (const [statusKey, statusValue] of Object.entries(apiStatus)) {
            const normalisedStatus = statusKey.toLowerCase();
            computed[`${reactivePropertyKey}${normalisedStatus}`] = function() {
                return this[reactivePropertyKey] === statusValue
            }
        }
    }
    return computed
}
