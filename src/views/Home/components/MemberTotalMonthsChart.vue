<template>
    <v-card
        elevation="0"
        class="pa-2"
        color="primary"
        rounded="medium"
    >
        <v-card-text class="text-surface font-weight-medium">
            Since 2021
        </v-card-text>
        <v-card-text class="pa-0">
            <area-spline-graph></area-spline-graph>
        </v-card-text>
    </v-card>
</template>

<script>
import AreaSplineGraph from "@/components/Charts/AreaSplineGraph.vue";

export default {
    name: "CurrentMonthMemberExpenseCard",
    components: {
        AreaSplineGraph,
    },
    setup() {
    }
}
</script>
