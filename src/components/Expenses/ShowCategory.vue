<template>
	<slot :category="category" />
</template>

<script>
import { computed } from "vue";
import { useGeneralStore } from "@/stores/GeneralStore";

export default {
    name: "ExpenseCategoryRenderless",

    props: {
        categoryId: {
            required: true,
            type: Number
        }
    },

    setup(props) {
        const generalStore = useGeneralStore();
        
        const category = computed(() => {
            if ( generalStore.expense_categories ) {
                return generalStore.expense_categories.find(category => category.id === props.categoryId); 
            }
            return null;
        });

        return {
            category
        }
    }
}
</script>