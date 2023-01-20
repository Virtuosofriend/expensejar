<script>
import { ref, inject } from "vue";
import { currentMonth } from "@/common/constants/routeQueries.js";

export default {
    name: "TransactionAvatarProvider",
    props: {
        routeQuery: {
            required: true,
            type: String
        }
    },

    setup(props, ctx) {
        const $date = inject("date");
        const { month, year } = getCurrentDate(props.routeQuery.month);

        const dateSelected = { 
            month: ref(month),
            year: ref(year)
        }
        return () => ctx.slots.default({
            dateSelected
        });

        function getCurrentDate(value) {
            if ( value === currentMonth ) {
                return {
                    month: $date().month(),
                    year: $date().year()
                }
            }
            return {
                month: $date().subtract(1, "month").month(),
                year: $date().subtract(1, "month").year()
            }
        }
    }
}
</script>