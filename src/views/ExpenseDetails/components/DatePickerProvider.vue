<script>
import { ref, inject } from "vue";
export default {
    name: "DatePickerUpdateExpenseProvider",
    props: {
        expenseDate: {
            required: true,
            type: Object,
        }
    },
    setup(props, ctx) {
        const $date = inject("date");
        const newExpenseDate = ref($date(props.expenseDate).format("DD-MM-YYYY"));
        return () => ctx.slots.default({
            newExpenseDate
        });
    }
}
</script>