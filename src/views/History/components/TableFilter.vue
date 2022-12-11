<template>
    <div :class="$style.filter">
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
        <users-in-jar :jar-id="activeJar"></users-in-jar>
    </div>
</template>

<script>
import { ref, watch } from "vue";
import ExpenseCategoriesDropdown from "@/components/General/ExpenseCategoriesDropdown.vue";
import UsersInJar from "@/components/jars/UsersInJarRenderless.vue";

import { useUserStore } from "@/stores/UserStore";

export default {
    name: "HistoryTableFilters",

    components: {
        ExpenseCategoriesDropdown,
        UsersInJar
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

<style module>
.filter {
    border-radius: 8px;
    background-color: #fff;
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 12px;
}
</style>