<template>
<v-select
    v-model="selectedItem"
    flat
    solo
    hide-details
    dense
    clearable
    background-color="primary"
    :items="categories"
    @change="emitEvent()"
>
    <template #label>
        <p class="text-xs mb-0 white--text op7 w-50 text-truncate">
            {{ $t( `History.typeOfTransaction` ) }}
        </p>
    </template>

    <template #selection="{ item }">
        <p class="white--text mb-0 text-sm">
            {{ item }}
        </p>
    </template>
</v-select>
</template>

<script>
import categories from "@/helpers/expensesCategories";

export default {
    name: "ExpensesFilterTransactionType",

    data() {
        return {
            categories,
            selectedItem: null
        }
    },

    methods: {
        emitEvent() {
            this.$emit("transaction-type", this.selectedItem);
        }
    }
}
</script>

<style>

</style>