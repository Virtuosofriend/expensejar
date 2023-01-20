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
                    >
                        <router-link :to="{ name: 'History', query: { month: CURRENT_MONTH }}">
                            <v-card-title 
                                :class="$style.text__title"
                                class="mb-2"
                            >
                                {{ $t( `Homepage.thisMonth` ) }}
                            </v-card-title>
                            <v-card-text>
                                <h4>
                                    <span class="font-weight-bold">
                                        {{ monthExpenses }}€
                                    </span>
                                    <small :class="$style.month__currentExpense">
                                        {{ percentageOfHome }}% {{ $t( `Homepage.ofTheHome` ) }}
                                    </small>
                                </h4>
                            </v-card-text>
                        </router-link>
                        <v-divider 
                            class="mx-2"
                            :class="$style.bg_divider"
                        ></v-divider>
                        <router-link :to="{ name: 'History', query: { month: PREVIOUS_MONTH }}">
                            <v-card-text class="text-body text-white">
                                {{ $t( `Homepage.previousMonth` ) }}:
                                <span class="font-weight-bold">
                                    {{ previousMonthExpenses }} €
                                </span>
                            </v-card-text>
                        </router-link>
                    </v-card>
                </v-col>

                <!-- Last 5 transactions table -->

                <v-col class="col-12 mt-4">
                    <div class="pa-2">
                        <h6>
                            {{ $t( `Homepage.lastTransactions` ) }}
                        </h6>
                        <section
                            v-if="lastFiveTransactions.length > 0"
                            height="320px"
                            class="overflow-y-auto"
                        >
                            <transaction-card 
                                v-for="item in lastFiveTransactions"
                                :key="item.id"
                                :transaction-item="item"
                                class="mt-4"
                            ></transaction-card>
                        </section>

                        <div v-else>
                            <p class="mt-4 text-sm">
                                {{ $t( `Homepage.noRecentTransactions` ) }}
                            </p>
                        </div>
                    </div>
                </v-col>
            </v-row>
        </section>
    </v-container>
</template>

<script>
import { inject, ref, computed } from "vue";
import { setExpenses, month_expenses, jar_summary } from "@/composables/monthExpenses";
import { currentMonth as CURRENT_MONTH, previousMonth as PREVIOUS_MONTH } from "@/common/constants/routeQueries.js";

import { useUserStore } from "@/stores/UserStore";
import { useApi } from "@/api/composables/useApi";
import { getExpense } from "@/api/expensesApi";

export default {
    name: "HomeView",

    components: {
        TransactionCard: () => import("@/components/General/TransactionCard.vue")
    },

    setup() {
        const $date = inject("date");
        const currentMonth = $date().format("MMMM");
        const userStore = useUserStore();
        const previousMonthExpenses = ref(0);
        
        const monthExpenses = month_expenses;
        const lastFiveTransactions = ref([]);

        const percentageOfHome = computed(() => {
            return Math.round(100 * monthExpenses.value / jar_summary.value)
        });

        // API layer variables
        const {
            data,
            exec: getExpensesFn,
            FetchExpensesStatusSuccess,
            FetchExpensesStatusError,
            FetchExpensesStatusIdle,
            FetchExpensesStatusPending
        } = useApi("FetchExpenses", getExpense);

        fetchThisAndPreviousMonthExpenses();
        
        return {
            currentMonth,
            previousMonthExpenses,
            monthExpenses,
            percentageOfHome,
            lastFiveTransactions,
            CURRENT_MONTH,
            PREVIOUS_MONTH
        }

        async function fetchThisAndPreviousMonthExpenses() {
            const previousMonth = $date().subtract(1, "month").format("YYYY-MM-01T12:00:00");
            const now = $date().format("YYYY-MM-DDT12:00:00");

            const payload = {
                // params: {
                //     filter: JSON.stringify({"_and":[{"_and":[{"jar_id":{"id":{"_eq":`${ userStore.active_jar }`}}},{"expense_date":{"_between":[`${previousMonth}`,`${now}`]}},{"user_created":{"_eq":`${ userStore.profile.id }`}}]}]})
                // }
                params: {
                    filter: JSON.stringify({"_and":[{"_and":[{"jar_id":{"id":{"_eq":`${ userStore.active_jar }`}}},{"expense_date":{"_between":[`${ previousMonth }`,`${ now }`]}}]}]}),
                    sort: "-expense_date",
                }
            };
			await getExpensesFn(payload);

            if ( FetchExpensesStatusError.value ) {
                return
            }

            let result = [];

            data.value.data.data.forEach(elem => {
                let expenseMonth = $date(elem.expense_date).month();
                if ( new Date().getMonth() === expenseMonth ) {
                    result.push({...elem});
                } else {
                    previousMonthExpenses.value += +elem.amount;
                }
            });

            let lastFiveUserTransanctions = data.value.data.data
                .filter(elem => elem.user_created === userStore.profile.id && $date(elem.expense_date).month() == new Date().getMonth());

            lastFiveTransactions.value = lastFiveUserTransanctions.splice(0,5);
            return setExpenses(result, userStore.profile.id);
        }
    }
}
</script>

<style module lang="scss">
.month__currentExpense {
    font-size: 36%;
    opacity: .6;
}

.text__title {
    font-size: 14px;
    opacity: .6;
    color: #fff;
}

.bg_divider {
    background-color: #22476f;
}
</style>