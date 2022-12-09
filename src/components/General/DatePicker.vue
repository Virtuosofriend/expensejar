<template>
    <div class="v-input__control">
        <div 
            class="v-field v-field--has-background v-field--prepended v-field--no-label v-field--variant-filled v-theme--expenseJarTheme bg-primary" 
            role="textbox"
        >
            <div class="v-field__prepend-inner pt-4">
                <i class="far fa-calendar v-icon notranslate v-theme--expenseJarTheme v-icon--size-default" aria-hidden="true"></i>
            </div>
            <div class="v-field__field">
                <flat-pickr
                    v-model="dateNow"
                    :config="config"
                    class="v-field__input pb-0 pl-2"
                    placeholder="Select date"
                    name="date"
                ></flat-pickr>
            </div>
        </div>
    </div>
</template>
<script>
import { ref, inject, watch } from "vue";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";

export default {
    name: "GeneralDatepicker",

    components: {
        flatPickr
    },

    emits: ["update:modelValue"],

    setup(props, { emit }) {
        const $date = inject("date");
        const dateNow = ref($date().format("DD-MM-YY"));

        const config = {
            wrap: true,
            altFormat: "M j, Y",
            altInput: true,
            dateFormat: "d-m-Y",
            disable: [disableDates]     
        };

        watch(dateNow, handlePickerChange, {
            immediate: true,
        })
        
        return {
            dateNow,
            config,
        }

        function disableDates(date) {
            const currentMonth = new Date().getMonth();
            const dateMonth = date.getMonth();
            if ( currentMonth !== dateMonth ) {
                return date;
            }
            return
        }

        function handlePickerChange() {
            const emittedDate = $date(dateNow.value, "DD-MM-YY").format("YYYY-MM-DDT12:00:00")
            emit("update:modelValue", emittedDate);
        }
    }
}
</script>

<style lang="scss" scoped>

</style>