<script>
import { inject, ref } from "vue";
import { useUserStore } from "@/stores/UserStore";
import { useJarStore } from "@/stores/JarStore";
import { useApi } from "@/api/composables/useApi";
import { getExpense } from "@/api/expensesApi";
import { CONFIG } from "@/common/config";
export default {
    name: "FetchMonthExpensesContainer",

    setup(props, ctx) {
        const userStore = useUserStore();
        const jarStore = useJarStore();
        const {
            data,
            exec: getExpensesFn,
            FetchExpensesStatusSuccess,
            FetchExpensesStatusError,
            FetchExpensesStatusIdle,
            FetchExpensesStatusPending
        } = useApi("FetchExpenses", getExpense);

        fetchCurrentMonthExpenses();

        const expensesList = ref([]);
        const userLastTransanctions = ref([]);

        return () => ctx.slots.default({
            activeUserId: userStore.profile.id,
            expensesList,
            userLastTransanctions,
            resultSuccess: FetchExpensesStatusSuccess,
            shouldShowExpensesList: !!expensesList.value.length && !!jarStore.members.length,
            monthlyExpenseLimit: CONFIG.month_expense_target,
            members: jarStore.members
        });

        async function fetchCurrentMonthExpenses() {
            const $date = inject("date");
            const now = $date().format("YYYY-MM-DDT12:00:00");
            const previousMonth = $date().subtract(1, "month").format("YYYY-MM-DDT12:00:00");
            // const nextMonth = $date().add(1, "month").format("YYYY-MM-DDT12:00:00");
            const payload = {
                params: {
                    filter: JSON.stringify({"_and":[{"_and":[{"jar_id":{"id":{"_eq":`${ userStore.active_jar }`}}},{"expense_date":{"_between":[`${ previousMonth }`,`${ now }`]}}]}]}),
                    sort: "-expense_date",
                }
                // params: {
                //     filter: JSON.stringify({"_and":[{"_and":[{"jar_id":{"id":{"_eq":`${ userStore.active_jar }`}}},{"expense_date":{"_between":[`${ now }`,`${ nextMonth }`]}}]}]}),
                //     sort: "-expense_date",
                // }
            };
			await getExpensesFn(payload);

            if ( FetchExpensesStatusError.value ) {
                return
            }
            data.value.data.data.forEach(elem => {
                let expenseMonth = $date(elem.expense_date).month();
                if ( new Date().getMonth() === expenseMonth ) {
                    expensesList.value.push({...elem});
                }
            });

            let lastFiveUserTransanctions = data.value.data.data
                .filter(elem => elem.user_created === userStore.profile.id);
            return userLastTransanctions.value = lastFiveUserTransanctions.splice(0,5);
        }
    }
}
</script>