<script>
import { useApi } from "@/api/composables/useApi";
import { updateExpenseDetails } from "@/api/expensesApi";
import { ref, watch } from "vue";

export default {
    name: "UpdateExpenseDetailsButtonContainer",
    props: {
        expenseId: {
            required: true,
            type: String
        },
        updatePayload: {
            required: true,
            type: Object,
        }
    },

    setup(props, ctx) {
        const updateResult = ref(null);
        const {
            data,
            exec: updateExpenseDetailsFn,
            UpdateExpenseStatusSuccess,
            UpdateExpenseStatusError,
            UpdateExpenseStatusIdle,
            UpdateExpenseStatusPending
        } = useApi("UpdateExpense", updateExpenseDetails);

        watch(updateResult, (newVal) => {
            setTimeout(() => updateResult.value = null, 2000);
        })

        async function UpdateExpenseDetails() {
            await updateExpenseDetailsFn(props.expenseId, { ...props.updatePayload });

            if ( UpdateExpenseStatusError.value ) {
                return updateResult.value = false;
            }
            return updateResult.value = true;
        }

        return () => ctx.slots.default({
            isLoading: UpdateExpenseStatusPending.value,
            updateResult: updateResult.value,
            handleClick: UpdateExpenseDetails
        });
    }
}
</script>