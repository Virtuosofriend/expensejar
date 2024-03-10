<template>
	<v-card
		elevation="0"
		rounded="medium"
	>
		<v-img
			height="160"
			:src="backgroundImage"
			cover
			class="text-white"
		>
			<v-card-text>
				<p
					class="font-weight-medium text-surface"
				>
					{{ $t( `Homepage.myExpensesThisMonth` ) }}
				</p>
			</v-card-text>
			<v-card-text class="mb-2 text-surface">
				<h4 class="font-weight-bold mb-6">
					{{ summaryExpense }}<span class="text-2xl">€</span>
				</h4>
				<p 
					v-if="summaryExpense > 0"
					class="text-xs"
				>
					{{ $t( `Homepage.seeDetails` ) }}
				</p>
			</v-card-text>
		</v-img>
	</v-card>
</template>

<script>
import { computed } from "vue";
export default {
    name: "CurrentMonthExpensesSummaryCard",
    props: {
        summaryExpense: {
            type: [Number, String],
            default: ""
        }
    },
    setup() {
        const backgroundImage = computed(() => {
            return new URL("@/assets/backgrounds/dots.svg", import.meta.url).href;
        });

        return {
            backgroundImage
        }
    }
}
</script>