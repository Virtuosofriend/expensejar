<template>
    <v-bottom-navigation
        :value="optionSelected"
        color="secondary"
        grow
        elevation="0"
        bg-color="primary"
        class="pt-3"
    >
        <v-btn
            v-for="item in items"
            :key="item.to"
            stacked 
            variant="plain"
            :prepend-icon="item.icon"
            :to="{ name: item.to }" 
        >
            {{ $t( `Menu.${ item.label }` ) }}
        </v-btn>
    </v-bottom-navigation>
</template>

<script>
import { ref } from "vue";
export default {
    name: "TheNavbar",

    setup() {
        const optionSelected = ref(0);
        const items = ref([
            {
                to:     "Home",
                icon:   "fas fa-home",
                label:  "home"
            },{
                to:     "History",
                icon:   "fas fa-history",
                label:  "history"
            },{
                to:     "Compare",
                icon:   "fas fa-not-equal",
                label:  "compare"
            },{
                to:     "Settings",
                icon:   "fas fa-cog",
                label:  "settings"
            }
        ]);

        return {
            items,
            optionSelected
        }
    }
}
</script>

<style scoped lang="scss">
</style>