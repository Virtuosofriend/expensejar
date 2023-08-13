<script>
import { setExpenses } from "@/composables/monthExpenses";
import { inject } from "vue";

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
        const $date = inject("date");
        const currentMonth = $date().month();
        const currentYear = $date().year();
        return () => ctx.slots.default({
            activeUserSummary,
            secondaryUserSummary,
            currentMonth,
            currentYear,
        });
    }
}
</script>