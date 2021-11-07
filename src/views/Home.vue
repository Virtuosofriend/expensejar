<template>
    <v-container>
         <!-- Monthly statistics -->

        <section>
            <v-row no-gutters>
                <v-col cols="12">
                    <v-card
                        elevation="0"
                        color="primary"
                        dark
                        min-height="250"
                    >
                        <v-card-title>
                            {{ currentMonth | onlyMonth }} overview
                        </v-card-title>
                        <v-card-text 
                            class="text-h4 secondary--text"
                        >
                                <small class="text-overline d-block">
                                    {{ $t( `Homepage.moneySpent` ) }}
                                </small>
                                <month-total-expenses 
                                    :month="currentMonth.format('MM')"
                                >
                                    <span slot-scope="{ totalExpenses, percentageOfHome }">
                                        <span class="font-weight-bold">
                                            {{ totalExpenses }} €
                                        </span>
                                        <small class="month__currentExpense d-inline">
                                            {{ percentageOfHome }}% {{ $t( `Homepage.ofTheHome` ) }}
                                        </small>
                                    </span>
                                </month-total-expenses>
                        </v-card-text>
                        <v-divider class="mx-4"></v-divider>
                        <v-card-text
                            class="text-body secondary--text"
                        >
                            {{ $t( `Homepage.previousMonth` ) }}:
                            <month-total-expenses 
                                    :month="currentMonth.subtract(1, 'month').format('MM')"
                                >
                                    <span slot-scope="{ totalExpenses }">
                                        <span class="font-weight-bold">
                                            {{ totalExpenses }} €
                                        </span>
                                    </span>
                                </month-total-expenses>
                        </v-card-text>
                    </v-card>
                    <div class="position-relative d-flex justify-center month__newexpense">
                        <v-btn 
                            color="secondary"
                            block
                            class="primary--text shadow"
                            :to="{ name: 'NewExpense'}"
                        >
                            {{ $t( `Homepage.createNewExpense` ) }}
                        </v-btn>
                    </div>
                </v-col>

                <!-- Last 5 transactions table -->

                <v-col cols="12">
                    <last-transactions class="mt-4"></last-transactions>
                </v-col>
            </v-row>
        </section>
    </v-container>
</template>

<script>
import LastTransactions from "./Homepage/LastTransactionsList.vue";
import MonthTotalExpenses from "./Homepage/components/MonthTotalExpenses.vue";

export default {
    name: "Home__view",

    data() {
        return {
            currentMonth: this.$date()
        }
    },
    
    components: {
        LastTransactions,
        MonthTotalExpenses
    }
}
</script>

<style lang="scss" scoped>
section {
    margin-bottom: 36px;
}

.month__newexpense {
    width: 50%;
    margin-left: auto;
    margin-right: auto;
    margin-top: -20px;
}

.month__currentExpense {
    font-size:12px; 
    display: inline-block; 
    margin-left: 4px;
}
</style>