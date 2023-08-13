<script>
import { ref } from "vue";
import { useRoute } from "vue-router";

export default {
    name: "DatePickerProvider",
    setup(props, ctx) {
        const route = useRoute();

        const dateSelected = { 
            month: ref(route.query.month),
            year: ref(route.query.year),
        };

        return () => ctx.slots.default({
            dateSelected
        });
    }
}
</script>