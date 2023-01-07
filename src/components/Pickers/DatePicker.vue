<template>
    <v-menu>
        <template #activator="{ props, isActive }">
            <v-btn
                color="transparent"
                :append-icon="isActive ? 'fas fa-caret-up' : 'fas fa-caret-down'"
                v-bind="props"
            >   
                {{ displayedMonth }}
            </v-btn>
        </template>
        <v-list v-model="month">
            <v-list-item
                v-for="(item, index) in listOfMonths"
                :key="index"
                :value="index"
                @click="$event => month = item.value"
            >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
        </v-list>
    </v-menu>
    <v-menu>
        <template #activator="{ props, isActive }">
            <v-btn
                color="transparent"
                :append-icon="isActive ? 'fas fa-caret-up' : 'fas fa-caret-down'"
                v-bind="props"
            >   
                {{ year }}
            </v-btn>
        </template>
        <v-list>
            <v-list-item
                v-for="(item, index) in listOfYears"
                :key="index"
                :value="index"
                @click="$event => year = item"
            >
                <v-list-item-title>{{ item }}</v-list-item-title>
            </v-list-item>
        </v-list>
    </v-menu>
</template>

<script>
import { ref, inject, computed } from "vue";
import { CONFIG } from "@/common/config";

export default {
    name: "InlineDatePicker",

    emits: ["update:modelValue"],

    setup(props, { emit }) {
        const $date = inject("date");

        const year = ref($date().year());
        const month = ref($date().month());
        
        const displayedMonth = computed(() => $date().month(month.value).format("MMM"));

        const listOfMonths = $date.months().map((month,index) => {
            return {
                title: month,
                value: index
            }
        });
        const listOfYears = createListOfYears();

        handleChangeOnSelect();

        return {
            year,
            month,
            displayedMonth,
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