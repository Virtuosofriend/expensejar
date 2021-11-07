<template>
    <v-container>
        <v-row no-gutters>
            <v-col
                cols="12"
            >
                <div class="d-flex align-center my-2">
                    <h2 class="text-center w-100">
                        {{ $t( `History.myTransactions` )}}
                    </h2>
                    <years-dropdown 
                        class="w-40" 
                        v-model="yearSelected"
                    ></years-dropdown>
                </div>
            </v-col>

            <!-- Months slide group -->
            <v-col cols="12">
                <months-slide-group 
                    class="mt-6"
                    v-model="monthSelected"
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
                        <h5>{{ monthNameSelected }} {{ $t( `History.overview` )}} </h5>
                    </v-card-title>

                    <transcactions-list
                        :items="transactions"
                        v-if="expensesListStatus_Success"
                    ></transcactions-list>
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
    name: "History__view",

    data() {
        return {
            yearSelected:   this.$date().year(),
            monthSelected:  this.$date().month() + 1,
            expensesListStatus: apiStatus.Idle,
            transactions: []
        }
    },

    computed: {
        ...apiStatusComputed("expensesListStatus"),

        monthNameSelected() {
            return this.$date().month(+this.monthSelected - 1).format("MMMM");
        },
    },

    methods: {
        async fetchExpenses() {
            this.expensesListStatus = apiStatus.Pending
            this.transactions.splice(0);
			const { response, error } = await withAsync(fetchTotalMonthExpenses, this.monthSelected, this.yearSelected);

			if (error) {
				this.expensesListStatus = apiStatus.Error
				return
			}
			
            if ( response.docs.length > 0 ) {
                let expensesListArray = [];
                response.docs.forEach(elem => {
                    const elementData = elem.data();
                    expensesListArray.push(elementData);
                });

                this.transactions = expensesListArray;
            }

            this.expensesListStatus = apiStatus.Success;
        }
    },

    components: {
        MonthsSlideGroup,
        TranscactionsList,
        YearsDropdown
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