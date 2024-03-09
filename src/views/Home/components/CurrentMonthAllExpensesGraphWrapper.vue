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
				{{ $t( `Homepage.expensesFor` ) }} {{ currentMonth }}
			</p>
			<p class="font-weight-medium">
				{{ monthLimit }}€
			</p>
		</v-card-text>
		<stacked-bar-graph
			:primary-percentage="primaryUserPercentage"
			:secondary-percentage="secondaryUserPercentage"
		/>
	</v-card>
</template>

<script>
import { inject } from "vue";
import StackedBarGraph from "@/components/Charts/StackedBarGraph.vue";
export default {
    name: "CurrentMonthAllExpensesGraphWrapper",
    components: {
        StackedBarGraph
    },
    props: {
        primaryUserPercentage: {
            required: true,
            type: Number
        },
        secondaryUserPercentage: {
            required: true,
            type: Number
        },
        monthLimit: {
            type: String,
            default: ""
        }
    },
    setup() {
        const $date = inject("date");
        return {
            currentMonth: $date().format("MMMM"),
        }
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