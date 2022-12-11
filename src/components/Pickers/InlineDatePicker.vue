<template>
    <div :class="$style.datepicker">
        <div class="arrow"></div>
        <div :class="$style.datepicker__main">
            <v-select 
                v-model="month" 
                :items="listOfMonths"
                hide-details 
                :label="month"
                bg-color="transparent" 
                color="primary" 
                variant="outlined"
                density="compact"
                single-line
                @update:modelValue="handleChangeOnSelect"
            ></v-select>
            <v-select 
                v-model="year" 
                :items="listOfYears"
                :label="year"
                class="ml-2"
                hide-details 
                bg-color="transparent" 
                color="primary" 
                variant="outlined"
                density="compact"
                single-line
                @update:modelValue="handleChangeOnSelect"
            ></v-select>
        </div>
        <div class="arrow"></div>
    </div>
</template>

<script>
import { ref, inject, watch } from "vue";
import { CONFIG } from "@/common/config";

export default {
    name: "InlineDatePicker",

    emits: ["update:modelValue"],

    setup(props, { emit }) {
        const $date = inject("date");

        const year = ref($date().year());
        const month = ref($date().month());
        
        const listOfMonths = $date.months().map((month,index) => {
            return {
                title: month,
                value: index
            }
        });
        const listOfYears = createListOfYears();

        watch(year, handleChangeOnSelect, { immediate: true });

        return {
            year,
            month,
            listOfMonths,
            listOfYears,
            handleChangeOnSelect
        }

        function createListOfYears() {
            let years = [];
            for (let i = CONFIG.starting_year; i <= $date().year(); i++ ) {
                years.push(i);
            }
            return years;
        }

        function handleChangeOnSelect(ev) {
            emit("update:modelValue", {
                year,
                month
            });
        }
    },
}
</script>

<style module>
.datepicker {
    border-radius: 8px;
    background-color: #fff;
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 12px;
}

.datepicker__main {
    display: flex;
}
</style>