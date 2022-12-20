<template>
    <div class="menu">
        <v-btn
            v-for="item in items"
            :key="item.to" 
            :color="routeName === item.to ? 'secondary': 'accents'"
            background-color="transparent"
            size="small"
            variant="text"
            exact
            stacked 
            :prepend-icon="item.icon"
            :to="{ name: item.to }" 
        >
            {{ $t(`Menu.${item.menuLabel}`) }}
        </v-btn>
    </div>
</template>

<script>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";

export default {
    name: "TheNavbar",

    setup() {
        const route = useRoute();
        const routeName = computed(() => route.name);

        const items = ref([
            {
                to:         "Home",
                icon:       "fas fa-home",
                menuLabel:  "home"
            },{
                to:         "NewExpense",
                icon:       "fa-solid fa-circle-plus",
                menuLabel:  "newExpense"
            }
        ]);

        return {
            items,
            routeName
        }
    }
}
</script>

<style scoped lang="scss">
.selectedClass {
    background-color: transparent;
}
</style>