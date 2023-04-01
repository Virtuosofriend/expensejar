<script>
import { useApi } from "@/api/composables/useApi";
import { deleteExpenseDetails } from "@/api/expensesApi";
import { useGeneralStore } from "@/stores/GeneralStore";
import { computed } from "vue";
export default {
    name: "DeleteExpenseDetailsContainer",
    props: {
        expenseId: {
            required: true,
            type: String
        },
    },

    setup(props, ctx) {
        const generalStore = useGeneralStore();
        const isDialogOpen = computed(() => generalStore.confirmationDialog);
        
        const {
            data,
            exec: deleteExpenseDetailsFn,
            DeleteExpenseStatusSuccess,
            DeleteExpenseStatusError,
            DeleteExpenseStatusIdle,
            DeleteExpenseStatusPending
        } = useApi("DeleteExpense", deleteExpenseDetails);

        async function deleteExpense() {
			await deleteExpenseDetailsFn(props.expenseId);

            if ( DeleteExpenseStatusError.value ) {
                return
            }
        }

        function handleDialogConfirmation(status) {
            generalStore.setConfirmationDialog(status);
        }

        return () => ctx.slots.default({
            deleteFunction: deleteExpense,
            isExecuted: DeleteExpenseStatusSuccess.value,
            isDialogOpen,
            handleDialog: handleDialogConfirmation
        });
    }
}
</script>