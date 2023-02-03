<template>
    <v-select 
        :model-value="modelValue"
        :items="categories"
        item-title="label_en"
        item-value="id"
        flat   
        hide-details 
        label="Pick a category"
        bg-color="primary" 
        color="white" 
        variant="solo"
        density="compact"
        single-line
        :clearable="clearable"
        @update:modelValue="handleUpdateEvent"
    ></v-select>
</template>

<script>
import { computed } from "vue";

import { useGeneralStore } from "@/stores/GeneralStore";

export default {
    name: "ExpenseCategories",

    props: {
        clearable: {
            type: Boolean,
            default: false
        },
        // eslint-disable-next-line vue/require-default-prop
        modelValue: Number
    },
    emits: ["update:modelValue"],

    setup(props, { emit }) {
        const GeneralStore = useGeneralStore();
        const categories = computed(() => GeneralStore.expense_categories);

        return {
            categories,
            handleUpdateEvent
        }

        function handleUpdateEvent(ev) {
            emit("update:modelValue", ev);
        }
    }
}
</script>
