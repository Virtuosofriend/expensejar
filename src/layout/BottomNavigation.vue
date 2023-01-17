<template>
    <div class="menu">
        <v-btn
            v-for="item in items"
            :key="item.to" 
            color="secondary"
            background-color="transparent"
            size="small"
            variant="text"
            exact
            stacked 
            class="pa-0 height__button"
            :prepend-icon="item.icon"
            :to="{ name: item.to }" 
        ></v-btn>
    </div>
</template>

<script>
import { ref } from "vue";

export default {
    name: "TheNavbar",

    setup() {
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
        }
    }
}
</script>