<template>
    <v-container fluid class="pa-0">
        <v-row dense>
            <v-col 
                v-for="(n, index) in 2"
                :key="index"
                cols="6"
            >
                <v-card
                    elevation="0"
                    class="pa-2"
                    :color="cardColors[index]"
                    rounded="medium"
                >
                    <v-card-text class="text-surface font-weight-medium px-2">
                        {{ members[index] }}'s expenses
                    </v-card-text>
                    <v-card-text class="text-surface text-xl font-weight-bold pt-0 px-2">
                        {{ expenses[index] }}€
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { colors } from "@/common/constants/graphColors.js";

export default {
    name: "CurrentMonthMemberExpenseCard",
    setup() {
        const members = ["Eleni", "Dimitris"];
        const expenses = [400,500];
        return {
            cardColors: colors,
            members,
            expenses,
        }
    }
}
</script>
