<template>
	<section
		height="320px"
		class="overflow-y-auto"
	>
		<transaction-card 
			v-for="item in expensesList"
			:key="item.id"
			:transaction-item="item"
			class="mt-4"
		/>
	</section>
</template>

<script>
import TransactionCard from "@/components/General/TransactionCard.vue"
export default {
    name: "CurrentMonthMemberExpenseCard",
    components: {
        TransactionCard,
    },
    props: {
        expensesList: {
            required: true,
            type: Array,
        }
    },
}
</script>
