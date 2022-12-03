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
            :prepend-icon="item.icon" 
            variant="plain"
        >
            {{ $t( `Menu.${item.to}` ) }}
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
                label:  "Home",
                icon:   "fas fa-home",
                to:     "home"
            },{
                label:  "History",
                icon:   "fas fa-history",
                to:     "history"
            },{
                label:  "Compare",
                icon:   "fas fa-not-equal",
                to:     "compare"
            },{
                label:  "Settings",
                icon:   "fas fa-cog",
                to:     "settings"
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