<script>
import { useApi } from "@/api/composables/useApi";
import { getExpenseDetails } from "@/api/expensesApi";
import { ref } from "vue";
import { useUserStore } from "@/stores/UserStore";

export default {
    name: "ExpenseDeetailsFormContainer",
    props: {
        expenseId: {
            required: true,
            type: String
        },
    },

    setup(props, ctx) {
        const userStore = useUserStore();

        const {
            data,
            exec: getExpenseDetailsFn,
            FetchExpenseStatusSuccess,
            FetchExpenseStatusError,
            FetchExpenseStatusIdle,
            FetchExpenseStatusPending
        } = useApi("FetchExpense", getExpenseDetails);
        const expenseDetails = ref(null);
        fetchExpenseDetails(props.expenseId)

        async function fetchExpenseDetails(expenseId) {
            await getExpenseDetailsFn(expenseId);

            if ( FetchExpenseStatusError.value ) {
                return
            }
            return expenseDetails.value = data.value.data.data;
        }
        return () => ctx.slots.default({
            details: expenseDetails.value,
            isLoadingCompleted: FetchExpenseStatusSuccess.value,
            jarId: userStore.active_jar,
        });
    }
}
</script>