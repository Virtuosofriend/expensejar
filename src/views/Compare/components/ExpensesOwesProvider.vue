<script>
import { properNumberRound } from "@/helpers/generalFunctions";
export default {
    name: "ExpensesOwesProvider",
    props: {
        membersExpenses: {
            required: true,
            type: Object
        },

        userId: {
            required: true,
            type: String
        }
    },

    setup(props, ctx) {
        let newMembersExpenses = {...props.membersExpenses};
        let difference = newMembersExpenses[props.userId].total;
        for (let value in newMembersExpenses) {
            if ( value != props.userId ) {
                difference = difference - newMembersExpenses[value].total
            }
        }
        difference = difference / 2;
        const userOwesMoney = difference <= 0 ? true : false;
        const owedMoney = Math.abs(properNumberRound(difference));

        return () => ctx.slots.default({
            owedMoney,
            userOwesMoney
        });
    }
}
</script>