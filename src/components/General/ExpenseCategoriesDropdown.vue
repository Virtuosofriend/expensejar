<template>
    <v-select 
        v-model="selectedCategory" 
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
import { computed, ref } from "vue";

import { useGeneralStore } from "@/stores/GeneralStore";

export default {
    name: "ExpenseCategories",

    props: {
        clearable: {
            type: Boolean,
            default: false
        }
    },
    emits: ["update:modelValue"],

    setup(props, { emit }) {
        const GeneralStore = useGeneralStore();

        const selectedCategory = ref(null);
        const categories = computed(() => GeneralStore.expense_categories);

        return {
            selectedCategory,
            categories,
            handleUpdateEvent
        }

        function handleUpdateEvent() {
            emit("update:modelValue", selectedCategory)
        }
    }
}
</script>
