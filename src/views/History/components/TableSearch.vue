<template>
    <v-menu
        :close-on-content-click="false"
    >
        <template #activator="{ props, isActive }">
            <v-btn
                color="transparent"
                icon="fa-solid fa-search"
                size="small"
                v-bind="props"
            ></v-btn>
        </template>
        <v-sheet
            elevation="2"
            color="primary"
            class="mx-auto"
            width="240"
        >
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
                autofocus
            ></v-text-field>
        </v-sheet>
    </v-menu>
</template>

<script>
import { ref, watch } from "vue";

export default {
    name: "TableSearch",

    emits: ["update:modelValue"],

    setup(props, { emit }) {
        const search = ref(null);

        watch(search, emitSearch);

        return {
            search,
        }

        function emitSearch() {
            return emit("update:modelValue", search.value);
        }
    }
}
</script>