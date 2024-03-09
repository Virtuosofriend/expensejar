<script>

export default {
    name: "LastUserTransanctionsProvider",
    props: {
        expensesList: {
            required: true,
            type: Array,
        },
        
    },
    setup(props, ctx) {
        const lastExpensesList = props.expensesList.value.map(elem => {
            return { ... elem }
        });
        return () => ctx.slots.default({
            shouldShowList: !!lastExpensesList.length > 0,
            lastExpensesList,
        });

    }
}
</script>