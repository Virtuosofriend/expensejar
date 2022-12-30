<template>
    <v-card
        elevation="0"
        color="primary"
        dark
    >
        <v-card-text class="d-flex align-center">
            <v-text-field
                v-model="search"
                color="secondary"
                :label="`${ $t('General.search')}`"
                hide-details
                variant="filled"
                dark
                density="compact"
                bg-color="primary"
                flat
            ></v-text-field>
            <expense-categories-dropdown
                v-model="category"
                class="ml-2"
                @update:modelValue="updateCategoryModel"
            ></expense-categories-dropdown>
        </v-card-text>
    </v-card>
</template>

<script>
import { ref, watch } from "vue";
import ExpenseCategoriesDropdown from "@/components/General/ExpenseCategoriesDropdown.vue";

import { useUserStore } from "@/stores/UserStore";

export default {
    name: "HistoryTableFilters",

    components: {
        ExpenseCategoriesDropdown,
    },

    emits: ["update:category_id", "update:search"],

    setup(props, { emit }) {
        const search = ref(null);
        const category = ref(null);
        const userStore = useUserStore();
        const activeJar = userStore.active_jar;

        watch(search, emitSearch);
        watch(category, emitCategoriesFilter);

        return {
            activeJar,
            search,
            category,
            updateCategoryModel
        }

        function emitSearch() {
            return emit("update:search", search.value);
        }

        function emitCategoriesFilter() {
            return emit("update:category_id", category.value);
        }

        function updateCategoryModel(ev) {
            category.value = ev.value;
        }
    }
}
</script>