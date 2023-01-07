<script>
import { computed } from "vue";
export default {
    name: "SortingButtonProvider",
    
    props: {
        buttomItem: {
            required: true,
            type: String
        },
        selectionSort: {
            required: true,
            type: String
        },
        sorting: {
            required: true,
            type: String
        }
    },

    setup(props, ctx) {
        const isSelected = computed(() => props.buttomItem === props.selectionSort.value);

        const sortIcon = computed(() => {
            return props.sorting.value == "DSC" ? "fa-solid fa-down-long" : "fa-solid fa-up-long"
        }) 
        return () => ctx.slots.default({
            isSelected: isSelected.value,
            sortIcon: sortIcon.value
        });
    }
}
</script>