<script>
import { ref, inject } from "vue";
export default {
    name: "DatePickerProvider",

    setup(props, ctx) {
        const $date = inject("date");
        const currentDate = ref($date().format("DD-MM-YYYY"));
        return () => ctx.slots.default({
            currentDate
        });
    }
}
</script>