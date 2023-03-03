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
        const dateNow = ref($date().format("DD-MM-YYYY"));

        const config = {
            wrap: true,
            altFormat: "M j, Y",
            altInput: true,
            dateFormat: "d-m-Y",
            enable: [enableDates]     
        };

        watch(dateNow, handlePickerChange, {
            immediate: true,
        })
        
        return {
            dateNow,
            config,
        }

        function enableDates(date) {
            const currentDate = $date();
            const dateInMilliseconds = $date(date).valueOf();
            const oldestDateAvailable = $date().subtract(1, "month").valueOf();

            if ( dateInMilliseconds >= oldestDateAvailable && date < currentDate ) {
                return date;
            }
            return
        }

        function handlePickerChange() {
            const emittedDate = $date(dateNow.value, "DD-MM-YYYY").format("YYYY-MM-DDT12:00:00")
            emit("update:modelValue", emittedDate);
        }
    }
}
</script>