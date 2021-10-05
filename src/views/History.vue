<template>
    <v-container>
        <v-row no-gutters>
            <v-col
                cols="12"
            >
                <h3 class="text-center">History</h3>
            </v-col>

            <!-- Months slide group -->
            <v-col cols="12">
                <months-slide-group class="mt-10"></months-slide-group>
            </v-col>

        </v-row>
    </v-container>
</template>

<script>
import MonthsSlideGroup from "./History/components/MonthsSlideGroup";

export default {
    name: "History__view",

    components: {
        MonthsSlideGroup
    }
}
</script>

<style lang="scss" scoped>

</style>