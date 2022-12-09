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
        solo
        single-line
        @update:modelValue="handleUpdateEvent"
    ></v-select>
</template>

<script>
import { computed, ref } from "vue";

import { useGeneralStore } from "@/stores/GeneralStore";

export default {
    name: "ExpenseCategories",

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
