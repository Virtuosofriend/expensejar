<script>
import { setExpenses } from "@/composables/monthExpenses";
export default {
    name: "CurrentMonthExpensesSummaryCardProvider",
    props: {
        activeUserId: {
            required: true,
            type: String,
        },
        totalExpenses: {
            required: true,
            type: Object,
        },
        jarMembers: {
            required: true,
            type: Array,
        }
    },
    setup(props, ctx) {
        const expenses = JSON.parse(JSON.stringify(props.totalExpenses.value))
        const { activeUserSummary,secondaryUserSummary } = setExpenses(expenses, props.jarMembers, props.activeUserId);
        
        return () => ctx.slots.default({
            activeUserSummary,
            secondaryUserSummary
        });
    }
}
</script>