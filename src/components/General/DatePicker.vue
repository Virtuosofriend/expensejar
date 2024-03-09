<template>
	<div class="v-input__control">
		<div 
			class="v-field v-field--has-background v-field--prepended v-field--no-label v-field--variant-filled v-theme--expenseJarTheme bg-primary" 
			role="textbox"
		>
			<div class="v-field__prepend-inner pt-4">
				<i
					class="far fa-calendar v-icon notranslate v-theme--expenseJarTheme v-icon--size-default"
					aria-hidden="true"
				/>
			</div>
			<div class="v-field__field">
				<flat-pickr
					v-model="dateValue"
					:config="config"
					class="v-field__input pb-0 pl-2"
					placeholder="Select date"
					name="date"
				/>
			</div>
		</div>
	</div>
</template>

<script>
import { ref, inject, watch, toRefs } from "vue";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";

export default {
    name: "GeneralDatepicker",
    components: {
        flatPickr
    },
    props: {
        modelValue: {
            required: true,
            type: String
        }
    },
    emits: ["update"],
    setup(props, { emit }) {
        const $date = inject("date");
        const { modelValue:dateValue } = toRefs(props);

        const config = {
            wrap: true,
            altFormat: "M j, Y",
            altInput: true,
            dateFormat: "d-m-Y",
            enable: [enableDates]     
        };

        watch(dateValue, handlePickerChange, {
            immediate: true,
        })
        
        return {
            dateValue,
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
            const emittedDate = $date(dateValue.value, "DD-MM-YYYY").format("YYYY-MM-DDT12:00:00")
            emit("update", emittedDate);
        }
    }
}
</script>