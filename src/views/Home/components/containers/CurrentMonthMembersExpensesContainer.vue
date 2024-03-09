<script>
import { colors } from "@/common/constants/graphColors.js";
import { memberExpenses } from "@/composables/monthExpenses";

export default {
    name: "CurrentMonthMembersExpensesProvider",
    setup(props, ctx) {
        const membersWithColor = memberExpenses.value
            .map((member,index) => {
                return {
                    ...member,
                    color: colors[index]
                }
            })
        return () => ctx.slots.default({
            jarMembers: membersWithColor
        });
    }
}
</script>