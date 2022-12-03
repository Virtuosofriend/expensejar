<template>
    <v-container>
        <v-row>
            <v-col
                cols="12"
            >
                <div class="d-flex align-center my-2">
                    <h2 class="text-center w-100 mr-6">
                        {{ $t( `Compare.compareTitle` ) }}
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
                >
                    <v-card-title>
                        <h5>{{ monthNameSelected }} {{ $t( `Compare.totalStats` ) }} </h5>
                    </v-card-title>
                    <div 
                        v-if="currentMonthExpensesStatus_Success && !summaryExpenses.message"
                        class="d-flex pb-3 pt-1 justify-center" 
                    >
                        <total-amount-spent
                            :user-id="expensesUsers.owner"
                            :sum="summaryExpenses.owner"
                            :total="summaryExpenses.total"
                            :difference="summaryExpenses.owner - summaryExpenses.secondary"
                            class="w-100"
                        ></total-amount-spent>

                        <total-amount-spent
                            v-if="expensesUsers.secondary_user != null"
                            :user-id="expensesUsers.secondary_user"
                            :sum="summaryExpenses.secondary"
                            :total="summaryExpenses.total"
                            :difference="summaryExpenses.secondary - summaryExpenses.owner"
                            class="ml-auto w-100"
                        ></total-amount-spent>
                    </div>
                    <base-loading-spinner
                        v-if="currentMonthExpensesStatus_Pending"
                    ></base-loading-spinner>

                    <base-no-content 
                        v-if="currentMonthExpensesStatus_Success && summaryExpenses.message"
                    >
                        <template #default>
                            <v-card-text>
                                <span class="primary--text">
                                    {{ $t( `Compare.noExpensesFound` ) }}
                                </span>
                            </v-card-text>
                        </template>
                    </base-no-content>
                </v-card>
            </v-col>

            <!-- Resolvement -->
            <v-col cols="12">
                <v-card
                    color="white"
                    elevation="0"
                    dark
                >
                    <v-card-title>
                        <h5> {{ $t( `Compare.resolvementTitle` ) }} </h5>
                    </v-card-title>
                    <v-card-text 
                        v-if="currentMonthExpensesStatus_Success && !summaryExpenses.message"
                        class="d-flex justify-center"
                    >
                        <resolvements-list 
                            :month="+monthSelected" 
                            :year="yearSelected"
                        >
                            <template #default="{ buttonStatus }">
                                <resolve-button
                                    :month="+monthSelected" 
                                    :year="yearSelected"
                                    :disabled="buttonStatus.status"
                                    class=""
                                    @resolvement-added="fetchExpenses()"
                                >
                                    <slot>
                                        <span v-if="buttonStatus.status && buttonStatus.month != null">
                                            {{ $t( `Compare.monthResolved` ) }}
                                        </span>
                                        <span v-else>
                                            {{ $t( `Compare.resolve` ) }} {{ monthNameSelected }}
                                        </span>
                                    </slot>
                                </resolve-button>
                            </template>
                        </resolvements-list>                        
                    </v-card-text>
                    <base-no-content v-if="currentMonthExpensesStatus_Success && summaryExpenses.message">
                        <template #default>
                            <v-card-text>
                                <span class="primary--text">
                                    {{ $t( `Compare.noExpensesFound` ) }}
                                </span>
                            </v-card-text>
                        </template>
                    </base-no-content>
                </v-card>
            </v-col>
            <!-- ./Resolvement -->

            <!-- Card by category -->
            <v-col 
                cols="12" 
                class="mb-6"
            >
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
                        v-if="currentMonthExpensesStatus_Success"
                        :chart-data="barChartData"
                    ></stacked-bar-categories>
                    <base-loading-spinner
                        v-if="currentMonthExpensesStatus_Pending"
                    ></base-loading-spinner>
                    <base-no-content 
                        v-if="currentMonthExpensesStatus_Success && barChartData.message"
                    >
                        <template #default>
                            <v-card-text>
                                <span class="primary--text">
                                    {{ $t( `Compare.noExpensesFound` ) }}
                                </span>
                            </v-card-text>
                        </template>
                    </base-no-content>
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
import MonthsSlideGroup from "./History/components/MonthsSlideGroup";
import YearsDropdown from "./History/components/YearsDropdownSelectMenu.vue";
import ResolvementsList from "./Compare/components/FetchResolvementsRenderless.vue";

export default {
    name: "CompareView",

    components: {
        StackedBarCategories,
        TotalAmountSpent,
        MonthsSlideGroup,
        YearsDropdown,
        ResolvementsList,
        ResolveButton: () => import("./Compare/components/ResolveMonthButton.vue")
    },

    data() {
        return {
            currentMonthExpensesStatus: apiStatus.Idle,
            barChartData: {},
            expensesUsers: {},
            summaryExpenses: {},
            yearSelected:   this.$date().year(),
            monthSelected:  null,
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
        }),

        monthNameSelected() {
            return this.$date().month(+this.monthSelected - 1).format("MMMM");
        },
    },

    methods: {
        async fetchExpenses() {
            this.currentMonthExpensesStatus = apiStatus.Pending;

			const { response, error } = await withAsync(fetchTotalMonthExpenses, this.monthSelected, this.yearSelected);

			if (error) {
				this.currentMonthExpensesStatus = apiStatus.Error;
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
                return this.currentMonthExpensesStatus = apiStatus.Success;
            }
            
            this.summaryExpenses = { message: "Not found" };
            this.barChartData = { message: "Not found"};
            return this.currentMonthExpensesStatus = apiStatus.Success;
        },
    },

    watch: {
        monthSelected(newVal) {
            if ( newVal ) {
                this.fetchExpenses();
            }
        },
        yearSelected() {
            return this.fetchExpenses();
        },
    },

}
</script>
