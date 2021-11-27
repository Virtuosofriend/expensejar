<template>
    <v-container>
        <v-row no-gutters>
            <v-col
                cols="12"
            >
                <div class="d-flex align-center my-2">
                    <h2 class="text-center w-100 mr-6">
                        {{ $t( `Compare.compareTitle` ) }}
                    </h2>
                </div>
            </v-col>

            <!-- Card with table -->
            <v-col cols="12 mb-4">
                <v-card
                    color="white"
                    elevation="0"
                    dark
                >
                    <v-card-title>
                        <h5>
                            {{ $t( `Compare.totalStats` ) }}
                        </h5>
                    </v-card-title>
                    <div class="d-flex pb-3 pt-1 justify-center" v-if="currentMonthExpensesStatus_Success">
                        <total-amount-spent
                            :userId="expensesUsers.owner"
                            :sum="summaryExpenses.owner"
                            :total="summaryExpenses.total"
                            class="w-100"
                        ></total-amount-spent>

                        <total-amount-spent
                            :userId="expensesUsers.secondary_user"
                            :sum="summaryExpenses.secondary"
                            :total="summaryExpenses.total"
                            v-if="expensesUsers.secondary_user != null"
                            class="ml-auto w-100"
                        ></total-amount-spent>
                    </div>
                    <base-loading-spinner
                        v-if="currentMonthExpensesStatus_Pending"
                    ></base-loading-spinner>
                </v-card>
            </v-col>

            <!-- Card by category -->
            <v-col cols="12">
                <v-card
                    color="white"
                    elevation="0"
                    dark
                >
                    <v-card-title>
                        <h5>
                            {{ $t( `Compare.byCategory` ) }}
                        </h5>
                    </v-card-title>

                    <stacked-bar-categories 
                        :chartData="barChartData"
                        v-if="currentMonthExpensesStatus_Success"
                    ></stacked-bar-categories>
                    <base-loading-spinner
                        v-if="currentMonthExpensesStatus_Pending"
                    ></base-loading-spinner>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { withAsync } from "@/helpers/withAsync";
import { apiStatus } from "@/api/constants/apiStatus";
import { apiStatusComputed } from "@/api/helpers/computedApiStatus";
import { fetchTotalMonthExpenses } from "@/api/expensesApi.js";

import { mapGetters, mapState } from "vuex";
import { reducer, sumArrayElements } from "@/helpers/arrayHelperFunctions";

import StackedBarCategories from "./Compare/components/StackedBarCategories.vue";
import TotalAmountSpent from "./Compare/components/TotalAmountSpent.vue";

export default {
    name: "Compare__view",

    data() {
        return {
            currentMonthExpensesStatus: apiStatus.Idle,
            barChartData: {},
            expensesUsers: {},
            summaryExpenses: {}
        }
    },

    computed: {
        ...apiStatusComputed("currentMonthExpensesStatus"),

        ...mapGetters({
            usersList: "general/getUsers",
            homesList: "general/getHomes"
        }),

        ...mapState({
            currentHome: state => state.auth.homeId
        })
    },

    methods: {
        async fetchExpenses() {
            this.currentMonthExpensesStatus = apiStatus.Pending;
            const currentMonth = this.$date().month() + 1;
            const currentYear = this.$date().year();

			const { response, error } = await withAsync(fetchTotalMonthExpenses, currentMonth, currentYear);

			if (error) {
				this.currentMonthExpensesStatus = apiStatus.Error
				return
			}

            let { userId:owner, extraUser_id:secondary_user } = this.homesList.filter(elem => elem.id == this.currentHome)[0];

            this.expensesUsers = {
                owner,
                secondary_user
            };
      
            if ( response.docs.length > 0 ) {
                let expensesFor = [];
                let expensesAgainst = [];

                response.docs.forEach(elem => {
                    const elementData = elem.data();
                    if ( elementData.home == this.currentHome ) {
                        let chartData = {
                            amount: elementData.amount,
                            category: elementData.category
                        };

                        if ( elementData.userId == owner ) {
                            expensesFor.push(chartData);
                        }

                        if ( elementData.userId == secondary_user ) {
                            expensesAgainst.push(chartData);
                        }
                    }
                });

                this.barChartData = {
                    owner: reducer(expensesFor).sort((a,b) => a.category > b.category),
                    users: this.expensesUsers, 
                    secondary: expensesAgainst.length > 0 ? reducer(expensesAgainst).sort((a,b) => a.category > b.category) : null
                };

                let owner_expense = sumArrayElements(this.barChartData.owner);
                let secondary_expense = expensesAgainst.length > 0 ? sumArrayElements(this.barChartData.secondary) : 0

                this.summaryExpenses = {
                    owner: owner_expense,
                    secondary: secondary_expense,
                    total: owner_expense + secondary_expense
                };
            }
            this.currentMonthExpensesStatus = apiStatus.Success;
        },
    },

    components: {
        StackedBarCategories,
        TotalAmountSpent
    },

    created() {
        this.fetchExpenses();
    }

}
</script>
