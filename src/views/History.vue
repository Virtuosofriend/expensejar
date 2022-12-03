<template>
    <v-container>
        <v-row no-gutters>
            <v-col
                cols="12"
            >
                <div class="d-flex align-center my-2">
                    <h2 class="text-center w-100 mr-6">
                        {{ $t( `History.myTransactions` ) }}
                    </h2>
                    <years-dropdown 
                        v-model="yearSelected"
                        class="w-40" 
                    ></years-dropdown>
                </div>
            </v-col>

            <!-- Months slide group -->
            <v-col cols="12">
                <months-slide-group 
                    v-model="monthSelected"
                    class="mt-6"
                ></months-slide-group>
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
                        <h5>{{ monthNameSelected }} {{ $t( `History.overview` ) }} </h5>
                    </v-card-title>

                    <transcactions-list
                        v-if="expensesListStatus_Success"
                        :items="transactions"
                        :search="search"
                        @delete-expense="fetchExpenses()"
                    >
                        <template #filters>
                            <v-text-field
                                v-model="search"
                                dense
                                flat
                                dark
                                background-color="primary"
                                clearable
                                solo
                                hide-details
                                :disabled="transactions.length == 0"
                                :label="`${ $t('General.search')}`"
                                @keyup.enter="handleSearch($event)"
                            >
                                <template #prepend-inner>
                                    <v-icon small>
                                        fas fa-search
                                    </v-icon>
                                </template>
                            </v-text-field>
                            <v-spacer></v-spacer>

                            <expenses-filter-transaction 
                                class="ml-2"
                                @transaction-type="filterExpenses($event)"
                            ></expenses-filter-transaction>
                        </template>
                    </transcactions-list>
                    <base-loading-spinner
                        v-if="expensesListStatus_Pending"
                    ></base-loading-spinner>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { withAsync } from "@/helpers/withAsync"
import { apiStatus } from "@/api/constants/apiStatus"
import { apiStatusComputed } from "@/api/helpers/computedApiStatus"
import { fetchTotalMonthExpenses } from "@/api/expensesApi.js"

import MonthsSlideGroup from "./History/components/MonthsSlideGroup";
import TranscactionsList from "./History/components/ExpensesDataIterator";
import YearsDropdown from "./History/components/YearsDropdownSelectMenu.vue";

export default {
    name: "HistoryView",

    components: {
        MonthsSlideGroup,
        TranscactionsList,
        YearsDropdown,
        ExpensesFilterTransaction: () => import("./History/components/ExpensesFilterTransactionType.vue")
    },

    data() {
        return {
            yearSelected:   this.$date().year(),
            monthSelected:  this.$date().month() + 1,
            expensesListStatus: apiStatus.Idle,
            transactions:       [],
            OriginalTransactions: [],
            search:             ""
        }
    },

    computed: {
        ...apiStatusComputed("expensesListStatus"),

        monthNameSelected() {
            return this.$date().month(+this.monthSelected - 1).format("MMMM");
        }
    },

    methods: {
        async fetchExpenses() {
            this.expensesListStatus = apiStatus.Pending;
            this.transactions.splice(0);
            this.OriginalTransactions.splice(0);
			const { response, error } = await withAsync(fetchTotalMonthExpenses, this.monthSelected, this.yearSelected);

			if (error) {
				this.expensesListStatus = apiStatus.Error
				return
			}

            if ( response.docs.length > 0 ) {
                let expensesListArray = [];
                response.docs.forEach(elem => {
                    let elementData = elem.data();
                    elementData.doc_id = elem.id;
                    expensesListArray.push(elementData);
                });
                this.OriginalTransactions = expensesListArray;
                this.transactions = expensesListArray;
            }

            this.expensesListStatus = apiStatus.Success;
        },

        filterExpenses(category) {
            if ( category == null ) {
                return this.transactions = this.OriginalTransactions;
            }
            this.expensesListStatus = apiStatus.Pending;
            let filtered_transactions = this.OriginalTransactions.filter(elem => elem.category === category);
            this.transactions = filtered_transactions;
            this.expensesListStatus = apiStatus.Success;
        },

        handleSearch(event) {
            this.search = event.target.value;
        }
    },

    watch: {
        yearSelected(newVal) {
            return this.fetchExpenses();
        },
        monthSelected(newVal) {
            return this.fetchExpenses();
        },
    },

    created() {
        this.fetchExpenses();
    }
}
</script>

<style lang="scss" scoped>

</style>