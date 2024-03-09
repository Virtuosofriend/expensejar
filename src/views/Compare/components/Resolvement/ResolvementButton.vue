<template>
	<v-btn
		:loading="CreateResolvementStatusPending"
		color="secondary"
		size="small"
		@click="handleClick"
	>
		{{ $t( `Compare.resolve` ) }}
	</v-btn>
</template>

<script>
import { useApi } from "@/api/composables/useApi";
import { newResolvement } from "@/api/expensesApi";

import { useJarStore } from "@/stores/JarStore.js";

export default {
    name: "ResolvementContainer",

    props: {
        jarId: {
            required: true,
            type: Number
        },
        selectedDate: {
            required: true,
            type: Object
        },
    },

    emits: ["resolvedMonth"],

    setup(props) {
        const jarStore = useJarStore();

        const {
            data,
            exec: CreateNewResolvementFn,
            CreateResolvementStatusSuccess,
            CreateResolvementStatusError,
            CreateResolvementStatusPending
        } = useApi("CreateResolvement", newResolvement);

        return {
            handleClick: addNewResolvement,
            CreateResolvementStatusPending
        }

        async function addNewResolvement() {
            const payload = {
                jar_id: props.jarId,
                month: props.selectedDate.month,
                year: props.selectedDate.year
            };
            await CreateNewResolvementFn(payload);

            if ( CreateResolvementStatusError.value ) {
                return
            }

            if ( CreateResolvementStatusSuccess.value ) {
                jarStore.setIsMonthResolved(true);
            }
        }
    }
}
</script>