<template>
    <v-container>
        <v-row no-gutters>
            <v-col
                cols="12"
            >
                <div class="d-flex align-center">
                    <h2 class="text-center w-100">
                        {{ $t( `History.myTransactions` ) }}
                    </h2>
                </div>
            </v-col>

            <!-- Date picker -->
            <v-col cols="12">
                <inline-date-picker v-model="selectedDate" class="my-2"></inline-date-picker>
            </v-col>

            <!-- Card with table -->
            <v-col cols="12">
                <!-- Filters -->
                <table-filter 
                    v-model:search="search"
                    v-model:category_id="category_id"
                ></table-filter>
                <!-- ./Filters-->
                <v-card
                    color="white"
                    elevation="0"
                    dark
                    min-height="250"
                >
                    <v-card-title>
                        <h5>{{ monthSelected }} {{ $t( `History.overview` ) }} </h5>
                    </v-card-title>

                    <transanctions-table 
                        v-if="(transactions.length > 0)"
                        :transactions="transactions"
                    ></transanctions-table>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { ref, inject, watch } from "vue";
import { useApi } from "@/api/composables/useApi";
import { getExpense } from "@/api/expensesApi";

import { useUserStore } from "@/stores/UserStore";

import TransanctionsTable from "./History/components/TransanctionsTable.vue";
import TableFilter from "./History/components/TableFilter.vue";
import InlineDatePicker from "@/components/Pickers/InlineDatePicker.vue";

import { debounce } from "@/helpers/debounce";

export default {
    name: "HistoryPage",

    components: {
        InlineDatePicker,
        TransanctionsTable,
        TableFilter,
    },

    setup() {
        const $date = inject("date");
        const monthSelected = ref($date().format("MMMM"));
        const userStore = useUserStore();

        // API layer variables
        const {
            data,
            exec: getExpensesFn,
            FetchExpensesStatusSuccess,
            FetchExpensesStatusError,
            FetchExpensesStatusIdle,
            FetchExpensesStatusPending
        } = useApi("FetchExpenses", getExpense);

        const selectedDate = ref({});
        const transactions = ref([]);
        const search = ref(null);
        const category_id = ref(null);

        // Watchers
        watch(selectedDate, fetchCurrentJarExpenses, {
            immediate: false,
            deep: true
        });

        watch(search, debounce(fetchCurrentJarExpenses, 600));

        watch(category_id, fetchCurrentJarExpenses);

        return {
            monthSelected,
            selectedDate,
            transactions,
            search,
            category_id
        }

        async function fetchCurrentJarExpenses() {
            let filter = {"_and":[{"_and":[{"jar_id":{"id":{"_eq":`${ userStore.active_jar }`}}},{"year(expense_date)": {
                        "_eq": `${ selectedDate.value.year }`
                    }},{
                        "month(expense_date)": {"_eq": `${ selectedDate.value.month + 1 }`}},
                    {"category_id": {"_neq": `${category_id.value}` }}
                ]}]};
            
            if ( category_id.value ) {
                filter["_and"][0]["_and"][3] = {
                    "category_id": {
                        "_eq": `${category_id.value}`
                    }
                }
            }

            const payload = {
                params: {
                    filter: JSON.stringify(filter),
                    search: search.value ?? null
                }
            };
			await getExpensesFn(payload);

            if ( FetchExpensesStatusError.value ) {
                return
            }

            return transactions.value = data.value.data.data;
        }
    }
}
</script>

<style lang="scss" scoped>

</style>