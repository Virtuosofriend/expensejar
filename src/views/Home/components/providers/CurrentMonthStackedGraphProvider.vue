<script>
import { activeUserSummary, secondaryUserSummary } from "@/composables/monthExpenses";
export default {
    name: "CurrentMonthStackedGraphProvider",
    props: {
        monthlyExpenseLimit: {
            required: true,
            type: Number,
        },
        
    },
    setup(props, ctx) {
        return () => ctx.slots.default({
            activeUserPercentage: percentageOfExpensePerLimit(activeUserSummary.value.monthlyExpensesSummary, props.monthlyExpenseLimit),
            secondaryUserPercentage: percentageOfExpensePerLimit(secondaryUserSummary.value.monthlyExpensesSummary, props.monthlyExpenseLimit),
        });

        function percentageOfExpensePerLimit(expense,limit) {
            return expense * 100 / limit;
        }
    }
}
</script>