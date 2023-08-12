<script>
import { colors } from "@/common/constants/graphColors.js";
import { memberExpenses } from "@/composables/monthExpenses";
import { useUserStore } from "@/stores/UserStore";

export default {
    name: "CurrentMonthMembersExpensesProvider",
    setup(props, ctx) {
        const userStore = useUserStore();
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