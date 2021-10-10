<template>
    <v-container>
        <v-row no-gutters>
            <v-col
                cols="12"
            >
                <div class="d-flex align-center my-2">
                    <h2 class="text-center w-100">My transactions</h2>
                    <years-dropdown class="w-40"></years-dropdown>
                </div>
            </v-col>

            <!-- Months slide group -->
            <v-col cols="12">
                <months-slide-group class="mt-6"></months-slide-group>
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
import YearsDropdown from "./History/components/YearsDropdownSelectMenu.vue";

export default {
    name: "History__view",

    data() {
        return {
            transactions: [
                {
                    id:     1,
                    amount: 152,
                    comment:     "Masoutis",
                    category: "Supermarket",
                    date:   "05 Oct"
                },{
                    id:     2,
                    amount: 6.4,
                    comment:     "Eight pieces",
                    category: "Food",
                    date:   "03 Oct"
                },{
                    id:     3,
                    amount: 12,
                    comment:     "Eyath",
                    category: "Utility bill",
                    date:   "02 Oct"
                },{
                    id:     4,
                    amount: 32.4,
                    comment:     "Klotho",
                    category: "Going out",
                    date:   "10 Oct"
                },{
                    id:     5,
                    amount: 28.1,
                    comment:     "HCN",
                    category: "Utility bill",
                    date:   "06 Oct"
                },{
                    id:     6,
                    amount: 250,
                    comment:     "October rent",
                    category:    "Monthly rent",
                    date:   "01 Oct"
                },{
                    id:     7,
                    amount: 210,
                    comment:     "Tellus in metus vulputate eu",
                    category: "Misc",
                    date:   "02 Oct"
                }
            ]
        }
    },

    components: {
        MonthsSlideGroup,
        TranscactionsList,
        YearsDropdown
    }
}
</script>

<style lang="scss" scoped>

</style>