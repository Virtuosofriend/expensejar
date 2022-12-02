<template>
    <v-container fluid>
        <v-row>
            <v-col
                v-for="item in items"
                :key="item.to"
            >
                <v-btn
                    color="primary"
                >
                    {{ item.label }}
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { ref } from "vue";
export default {
    name: "TheNavbar",

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