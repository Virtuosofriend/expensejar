<template>
    <v-select 
        v-model="yearSelected"
        :items="years"
        flat 
        solo-inverted 
        hide-details 
        dense
        rounded
        background-color="secondary"
        label="Year"
        append-icon=""
        @change="handleChange()"
    >
        <template #selection="{ item }">
            <p class="mb-0 text-xs">
                {{ item }}
            </p>
        </template>
        <template #append>
            <v-icon small color="primary">
                far fa-calendar
            </v-icon>
        </template>
    </v-select>
</template>

<script>
import { CONFIG } from "@/common/config";

export default {
    name: "YearsDropdownmenu",
    
    model: {
        event: "change"
    },

    data() {
        return {
            yearSelected: this.$date().year()
        }
    },

    computed: {
        years() {
            let yearsArray = [CONFIG.starting_year];
            const current_year = this.$date().year();
            for (let i = yearsArray[0]; i < current_year; i++ ) {
                yearsArray.push(yearsArray[0] + 1);
            }
            return yearsArray;
        }
    },

    methods: {
        handleChange() {
            this.$emit("change", this.yearSelected)
        }
    }
}
</script>

<style lang="scss" scoped>

</style>