<script>
import { ref } from "vue";

export default {
    name: "TableSortingContainer",

    setup(props, ctx) {
        const selectionOrder = ref("DSC");
        const selectionSort = ref("expense_date");

        const sortingButtons = {
            expense_date: {
                label: "Date",
            },
            amount: {
                label: "Amount",
            }
        };

        return () => ctx.slots.default({
            sortingButtons,
            handleButtonClick,
            selectionSort,
            selectionOrder
        });

        function handleButtonClick(button_id) {
            if ( selectionSort.value == button_id ) {
                return selectionOrder.value =  selectionOrder.value == "ASC" ? "DSC" : "ASC";
            }
            selectionSort.value = button_id;
        }
    }
}
</script>