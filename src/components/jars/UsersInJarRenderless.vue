<template>
    <slot :members="members"></slot>
</template>

<script>
import { ref } from "vue";

import { useApi } from "@/api/composables/useApi";
import { fetchSpecificJar } from "@/api/jarsApi";

export default {
    name: "UsersInJar",

    props: {
        jarId: {
            required: true,
            type: Number
        }
    },

    setup(props) {
        const members = ref([]);
        
        // API layer variables
        const {
            data,
            exec: getJarsFn,
            FetchJarsStatusSuccess,
            FetchJarsStatusError,
            FetchJarsStatusIdle,
            FetchJarsStatusPending
        } = useApi("FetchJars", fetchSpecificJar);

        fetchCurrentJarExpenses();

        return {
            members
        }

        async function fetchCurrentJarExpenses() {
            const payload = {
                id: props.jarId
            }
			await getJarsFn(payload);

            if ( FetchJarsStatusError.value ) {
                return
            }

            return members.value = data.value.data.data;
        }
    }
}
</script>