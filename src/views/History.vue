<template>
    <v-container>
        <v-row no-gutters>
            <v-col
                cols="12"
            >
                <h3 class="text-center">History</h3>
            </v-col>

            <!-- Months slide group -->
            <v-col cols="12">
                <months-slide-group class="mt-10"></months-slide-group>
            </v-col>

            <!-- Card with table -->
            <v-col cols="12">
                <v-card
                    color="white"
                    elevation="0"
                    dark
                    min-height="250"
                >
                    <v-card-title>
                        <h5>October overview</h5>
                    </v-card-title>

                    <transcactions-list
                        :items="transactions"
                    ></transcactions-list>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import MonthsSlideGroup from "./History/components/MonthsSlideGroup";
import TranscactionsList from "./History/components/ExpensesDataIterator";

export default {
    name: "History__view",

    data() {
        return {
            transactions: [
                {
                    id:     1,
                    amount: 152,
                    transaction: "Supermarket",
                    date:   "05 Oct"
                },{
                    id:     2,
                    amount: 6.4,
                    transaction: "Food",
                    date:   "03 Oct"
                },{
                    id:     3,
                    amount: 12,
                    transaction: "Water bill",
                    date:   "02 Oct"
                },{
                    id:     4,
                    amount: 32.4,
                    transaction: "Going out",
                    date:   "10 Oct"
                },{
                    id:     5,
                    amount: 28.1,
                    transaction: "Internet bill",
                    date:   "06 Oct"
                },{
                    id:     6,
                    amount: 250,
                    transaction: "Monthly rent",
                    date:   "01 Oct"
                },{
                    id:     7,
                    amount: 210,
                    transaction: "Tellus in metus vulputate eu",
                    date:   "02 Oct"
                }
            ]
        }
    },

    components: {
        MonthsSlideGroup,
        TranscactionsList
    }
}
</script>

<style lang="scss" scoped>

</style>