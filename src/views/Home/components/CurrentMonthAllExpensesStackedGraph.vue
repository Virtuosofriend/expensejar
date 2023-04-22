<template>
    <v-card
        elevation="0"
        color="primary"
        dark
        class="pa-2"
        rounded="medium"
    >
        <v-card-text class="d-flex justify-space-between pt-2">
            <p class="font-weight-medium title">
                    Expenses for April
                </p>
                <p class="font-weight-medium">
                    2.000€
                </p>
        </v-card-text>
        <stacked-bar-graph></stacked-bar-graph>
    </v-card>
</template>

<script>
import StackedBarGraph from '@/components/Charts/StackedBarGraph.vue';
export default {
    name: "CurrentMonthAllExpensesStackedGraph",
    components: {
        StackedBarGraph
    },
    setup() {
    }
}
</script>

<style scoped>
.title {
    font-size: 14px;
    opacity: .6;
    color: #fff;
}
</style>