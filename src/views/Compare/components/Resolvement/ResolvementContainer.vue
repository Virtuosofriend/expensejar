<template>
    <resolvement-button 
        v-if="!monthIsResolved"
        :jar-id="jarId"
        :selected-date="selectedDate"
        @resolvedMonth="FetchResolvement"
    ></resolvement-button>

    <resolved-button-wrapper
        v-else
        :resolved-by-user="resolvedByUser"
        :date-resolved="dateResolved"
    ></resolved-button-wrapper>
</template>

<script>
import resolvementButton from "./ResolvementButton.vue";
import ResolvedButtonWrapper from "./ResolvedButtonWrapper.vue";

import { ref, watch } from "vue";
import { useApi } from "@/api/composables/useApi";
import { getResolvement } from "@/api/expensesApi";
import { useJarStore } from "@/stores/JarStore.js";

export default {
    name: "ResolvementContainer",

    components: {
        resolvementButton,
        ResolvedButtonWrapper
    },

    props: {
        jarId: {
            required: true,
            type: Number
        },

        selectedDate: {
            required: true,
            type: Object
        },
        monthIsResolved: {
            type: Boolean
        }
    },

    setup(props) {
        const jarStore = useJarStore();

        const {
            data,
            exec: FetchResolvementFn,
            FetchResolvementStatusSuccess,
            FetchResolvementStatusError,
            FetchResolvementStatusPending
        } = useApi("FetchResolvement", getResolvement);

        FetchResolvement();

        const dateResolved = ref(null);
        const resolvedByUser = ref(null);

        // Watchers
        watch(props.selectedDate, FetchResolvement, {
            immediate: false,
            deep: true
        });

        return {
            FetchResolvementStatusPending,
            dateResolved,
            FetchResolvement,
            resolvedByUser
        }

        async function FetchResolvement() {
            let filter = {"_and":[{"_and":[{"jar_id":{"id":{"_eq":`${ props.jarId }`}}},{"year": {
                        "_eq": `${ props.selectedDate.year }`
                    }},{
                        "month": {"_eq": `${ props.selectedDate.month }`}}
                ]}]};
            const payload = {
                params: {
                    filter: JSON.stringify(filter),
                    fields: "id,date_created,user_created.*.*,month,year"
                }
            };
			await FetchResolvementFn(payload);

            if ( FetchResolvementStatusError.value ) {
                return
            }

            if ( FetchResolvementStatusSuccess.value ) {
                if ( data.value.data.data.length > 0 ) {
                    dateResolved.value = data.value.data.data[0].date_created;
                    resolvedByUser.value = data.value.data.data[0].user_created.first_name;
                    return jarStore.setIsMonthResolved(true);
                } else {
                    return jarStore.setIsMonthResolved(false);
                }
            }
        }
    }
}
</script>