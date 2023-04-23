<script>
import { CONFIG } from "@/common/config";

export default {
    name: "AreaSplineGraphProvider",
    props: {
        graphData: {
            required: true,
            type: Array,
        },
        
    },
    setup(props, ctx) {
        const startingPoint = Date.UTC(CONFIG.starting_year, CONFIG.starting_month, 1);
        let monthlySummaries = props.graphData.value.map(data => data.sum.amount);
        return () => ctx.slots.default({
            startingPoint,
            monthlySummaries
        });

    }
}
</script>