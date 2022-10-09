<template>
    <v-toolbar>
            <template #start>
                <v-button class="bg-primary mr-2 text-white p-2 rounded">
                    Home
                </v-button>
                <v-button class="bg-primary mr-2 text-white p-2 rounded">
                    History
                </v-button>
                <v-button class="bg-primary mr-2 text-white p-2 rounded">
                    Compare
                </v-button>
                <v-button class="bg-primary mr-2 text-white p-2 rounded">
                    Settings
                </v-button>
            </template>
        </v-toolbar>
</template>

<script>
import VToolbar from "primevue/toolbar";
import VButton from "primevue/button";
import { ref } from "vue";
export default {
    name: "TheNavbar",

    components: {
        VToolbar,
        VButton
    },

    setup() {
        const active = ref(1);
        const items = ref([
            {
                label:  "Home",
                icon:   "",
                to:     "home"
            },{
                label:  "History",
                icon:   "",
                to:     "history"
            },{
                label:  "Compare",
                icon:   "",
                to:     "compare"
            },{
                label:  "Settings",
                icon:   "",
                to:     "settings"
            }
        ]);

        return {
            items,
            active
        }
    }
}
</script>

<style scoped lang="scss">
::v-deep .p-toolbar-group-left {
    justify-content: center;
    width: 100%;
}
</style>