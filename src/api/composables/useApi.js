import { ref, computed } from "vue";
import { apiStatus } from "../constants/apiStatus";

const { Idle, Success, Pending, Error } = apiStatus;

/**
* Create an object of computed statuses
*
* @param {Symbol} status
* @param {String} apiName
*/
const createNormalisedApiStatuses = (status, apiName) => {
    const normalisedApiStatuses = {};

    for (const [statusKey, statusValue] of Object.entries(apiStatus)) {
        let propertyName = "";
        // Create a property name for each computed status
        if (apiName) {
            propertyName = `${apiName}Status${statusKey}`;
        } else {
            propertyName = `status${statusKey}`;
        }

        // Create a computed that returns true/false based on
        // the currently selected status
        normalisedApiStatuses[propertyName] = computed(
            () => statusValue === status.value
        )
    }

    return normalisedApiStatuses
}

/**
 * @param {string} apiName
 * @param {function} fn
 * @param {object} config
 */
export const useApi = (apiName, fn, config = {}) => {
    const { initialData, responseAdapter } = config;
    // Reactive values to store data and API status
    const data = ref(initialData);
    const status = ref(Idle);
    const error = ref(null);

    /**
     * Initialise the api request
     */
    const exec = async (...args) => {
        try {
            status.value = Pending;
            const response = await fn(...args);
            data.value =
                typeof responseAdapter === "function"
                ? responseAdapter(response)
                : response;
            status.value = Success;
        } catch (error) {
            error.value = error;
            status.value = Error;
        }
  }

  const setStatus = nextStatus => (status.value = nextStatus);

  return {
        data,
        status,
        error,
        exec,
        setStatus,
        ...createNormalisedApiStatuses(status, apiName),
  }
}
