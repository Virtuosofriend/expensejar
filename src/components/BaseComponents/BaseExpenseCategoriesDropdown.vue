<template>
    <v-select 
        :items="categories" 
        v-model="selectedCategory" 
        flat   
        hide-details 
        label="Pick a category"
        background-color="primary" 
        color="white" 
        dark
        append-icon="fas fa-caret-down" 
        solo
        @input="emitCategory()"
    >
        <template #append>
            <v-icon color="white" small>
                fas fa-caret-down
            </v-icon>
        </template>

     
    </v-select>
</template>

<script>
import categories from "@/helpers/expensesCategories";

export default {
    name: "Expense__categories",

    data() {
        return {
            categories,
            selectedCategory: null
        }
    },

    methods: {
        emitCategory() {
            this.$emit("input", this.selectedCategory);
        }
    }
}
</script>
