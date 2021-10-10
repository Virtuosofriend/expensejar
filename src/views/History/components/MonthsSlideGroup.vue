<template>
    <v-sheet
        max-width="700"
        color="transparent"
        class="pb-4"
    >
        <v-slide-group
            v-model="selectedMonth"
            mandatory
            show-arrows
            center-active
            active-class="primary"
        >
            <template #prev>
                <v-icon color="primary">
                    fas fa-caret-left
                </v-icon>
            </template>
            <template #next>
                <v-icon color="primary">
                    fas fa-caret-right
                </v-icon>
            </template>
            <v-slide-item
                v-for="month in months"
                :key="month"
                v-slot="{ active, toggle }"
            >
                <v-btn
                    class="mx-2"
                    min-width="120"
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
            selectedMonth: this.$date().month()
        }
    }
}
</script>

<style lang="scss" scoped>

</style>