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
            @change="handleChange()"
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
                v-for="month in properMonths"
                :key="month.id"
                v-slot="{ active, toggle }"
                :value="month.value"
            >
                <v-btn
                    class="mx-2"
                    min-width="120"
                    :input-value="active"
                    depressed
                    :color="active ? undefined : 'secondary'"
                    @click="toggle"
                >
                    {{ month.name }}
                </v-btn>
            </v-slide-item>
        </v-slide-group>
    </v-sheet>
</template>

<script>
export default {
    name: "MonthsSlideGroup",

    model: {
        event: "change"
    },

    data() {
        return {
            months: this.$date.months(),
            selectedMonth: this.$date().month()
        }
    },

    computed: {
        properMonths() {
            return this.months.map((month,index) => {
                return {
                    id: index + 1,
                    name: month,
                    value: index <= 8 ? `0${ index + 1 }` : index + 1
                }
            })
        }
    },

    methods: {
        handleChange() {
            this.$emit("change", this.selectedMonth);
        }
    }
}
</script>

<style lang="scss" scoped>

</style>