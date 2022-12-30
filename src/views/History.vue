<template>
    <v-container>
        <v-row no-gutters>
            <v-col
                cols="12"
            >
                <div class="d-flex align-center">
                    <h6 class="text-center w-100">
                        {{ $t( `History.myTransactions` ) }}
                    </h6>
                </div>
            </v-col>

            <!-- Date picker -->
            <v-col cols="12">
                <inline-date-picker v-model="selectedDate" class="my-2"></inline-date-picker>
            </v-col>

            <!-- Card with table -->
            <v-col cols="12">
                <users-in-jar-container
                    :jar-id="jarId"
                >
                    <template #default="{ members }">
                        <!-- Filters -->
                        <table-filter 
                            v-model:search="search"
                            v-model:category_id="category_id"
                        ></table-filter>
                        <!-- ./Filters-->
                        <v-card
                            v-if="members.length > 0"
                            color="primary"
                            elevation="0"
                            dark
                            min-height="250"
                        >
                            <transanctions-table-wrapper>
                                <template #default>
                                    <transanction-card
                                        v-for="item in transactions"
                                        :key="item.name"
                                        :transaction-item="item"
                                    >
                                        <template #avatar>
                                            <transaction-avatar-provider
                                                :members="members"
                                                :user-id="item.user_created"
                                            >
                                                <template #default="{userProfile}">
                                                    <transanction-avatar
                                                        :avatar-url="userProfile.avatar"
                                                    ></transanction-avatar>
                                                </template>
                                            </transaction-avatar-provider>
                                        </template>
                                    </transanction-card>
                                </template>
                            </transanctions-table-wrapper>
                        </v-card>
                    </template>
                </users-in-jar-container>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { ref, inject, watch } from "vue";
import { useApi } from "@/api/composables/useApi";
import { getExpense } from "@/api/expensesApi";

import { useUserStore } from "@/stores/UserStore";

import TableFilter from "./History/components/TableFilter.vue";
import InlineDatePicker from "@/components/Pickers/InlineDatePicker.vue";
import UsersInJarContainer from "./History/components/UsersInJarContainer.vue";
import TransanctionsTableWrapper from "./History/components/TransanctionsTableWrapper.vue";
import TransanctionCard from "@/components/General/TransactionCard.vue";
import TransactionAvatarProvider from "./History/components/TransactionAvatarProvider.vue";
import TransanctionAvatar from "./History/components/TransanctionAvatar.vue";
import { debounce } from "@/helpers/debounce";

export default {
    name: "HistoryPage",

    components: {
        InlineDatePicker,
        TableFilter,
        TransanctionsTableWrapper,
        TransanctionCard,
        TransactionAvatarProvider,
        UsersInJarContainer,
        TransanctionAvatar
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
            category_id,
            jarId: userStore.active_jar
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