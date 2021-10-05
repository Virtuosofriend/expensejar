<template>
    <v-sheet
        class="pa-4"
        max-width="700"
        color="transparent"
    >
        <v-slide-group
            hide-arrows
            active-class="primary"
            :value="selectedMonth"
        >
            <v-slide-item
                v-for="month in months"
                :key="month"
                v-slot="{ active, toggle }"
            >
                <v-btn
                    class="mx-2"
                    :input-value="active"
                    depressed
                    :color="active ? undefined : 'secondary'"
                    @click="toggle"
                >
                    {{ month }}
                </v-btn>
            </v-slide-item>
        </v-slide-group>
    </v-sheet>
</template>

<script>
export default {
    name: "Months__slideGroup",

    data() {
        return {
            months: this.$date.months(),
            selectedMonth: this.$date().format("MMMM") 
        }
    },

}
</script>

<style lang="scss" scoped>

</style>