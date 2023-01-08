<script>
import { computed } from "vue";
import { useJarStore } from "@/stores/JarStore";

export default {
    name: "TableSortingContainer",

    setup(props, ctx) {
        const jarStore = useJarStore();
        const selectionOrder = computed(() => jarStore.sortingDirection);
        const selectionSort = computed(() => jarStore.sortingOption);

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
                const orderValue = selectionOrder.value == "ASC" ? "DSC" : "ASC";
                return jarStore.setSortingDirection(orderValue);
            }
            jarStore.setSortingOption(button_id);
        }
    }
}
</script>