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
            <area-spline-graph-provider
                v-slot="{ 
                    monthlySummaries,
                    startingPoint
                }"
                :graph-data="chartData"
            >
                <area-spline-graph 
                    v-if="monthlySummaries.length"
                    :graph-data="monthlySummaries"
                    :starting-point="startingPoint"
                ></area-spline-graph>
            </area-spline-graph-provider>
        </v-card-text>
    </v-card>
</template>

<script>
import AreaSplineGraph from "@/components/Charts/AreaSplineGraph.vue";
import AreaSplineGraphProvider from "./providers/AreaSplineGraphProvider.vue";

export default {
    name: "CurrentMonthMemberExpenseCard",
    components: {
        AreaSplineGraph,
        AreaSplineGraphProvider,
    },
    props: {
        chartData: {
            required: true,
            type: Array,
        }
    },
}
</script>
