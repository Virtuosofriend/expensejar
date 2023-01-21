<script>
export default {
    name: "JarExpensesContainer",
    props: {
        members: {
            required: true,
            type: Array
        },
        totalTransanctions: {
            required: true,
            type: Array
        }
    },

    setup(props, ctx) {
        const expensesPerUser = {};
        const jarTotalExpenses = props.totalTransanctions.reduce(aggregateExpenses, 0);
        props.members.forEach(member => {
            const expensesPerMember = props.totalTransanctions.filter(expense => expense.user_created === member.id );
            const amountOfExpenses = expensesPerMember.reduce(aggregateExpenses, 0);
            expensesPerUser[member.id] = {
                percentage: Math.round(100 * amountOfExpenses / jarTotalExpenses),
                total: amountOfExpenses
            };
        });

        function aggregateExpenses(accumulator, currentValue) {
            return accumulator + currentValue.amount;
        }
        return () => ctx.slots.default({
            totalExpenses: jarTotalExpenses,
            expensesPerUser
        });
    }
}
</script>