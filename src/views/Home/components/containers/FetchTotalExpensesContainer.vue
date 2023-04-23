<script>
import { ref } from "vue";
import { useUserStore } from "@/stores/UserStore";
import { useApi } from "@/api/composables/useApi";
import { getExpenseAggregation } from "@/api/expensesApi";

export default {
    name: "FetchTotalExpensesContainer",

    setup(props, ctx) {
        const userStore = useUserStore();
        const {
            data,
            exec: getExpensesFn,
            FetchExpensesStatusSuccess,
            FetchExpensesStatusError,
            FetchExpensesStatusIdle,
            FetchExpensesStatusPending
        } = useApi("FetchExpenses", getExpenseAggregation);

        fetchSumExpensesPerMonthTotal();
        const sumExpensesPerMonth = ref([]);

        return () => ctx.slots.default({
            sumExpensesPerMonth,
            fetchSuccess: !!sumExpensesPerMonth.value.length > 0
        });

        async function fetchSumExpensesPerMonthTotal() {
            const payload = {
                params: {
                    filter: JSON.stringify({"_and":[{"_and":[{"jar_id":{"id":{"_eq":`${ userStore.active_jar }`}}}]}]}),
                }
            };
			await getExpensesFn(payload);

            if ( FetchExpensesStatusError.value ) {
                return
            }
            return sumExpensesPerMonth.value = data.value.data.data;
        }
    }
}
</script>