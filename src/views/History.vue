<template>
    <v-container>
        <users-in-jar-container
            :jar-id="jarId"
        >
            <template #default="{ members }">
                <v-row no-gutters>
                    <v-col
                        cols="12"
                    >
                        <page-title-wrapper>
                            <template #default>
                                {{ jarLabel }} {{ $t( `History.myTransactions` ) }}
                            </template>
                        </page-title-wrapper>
                    </v-col>

                    <v-col cols="12">
                        <v-card
                            elevation="0"
                            color="transparent"
                            dark
                        >
                            <v-card-text class="d-flex align-center pa-0 mt-3">
                                <expense-date-picker v-model="selectedDate" class="my-2"></expense-date-picker>
                                <!-- Filters -->
                                <div class="ml-auto d-flex">
                                    <table-search v-model="search"></table-search>
                                    <table-filter-wrapper 
                                        v-model:category_id="category_id"
                                        v-model:user_created="user_created"
                                        :jar-members="members"
                                    ></table-filter-wrapper>
                                    <table-sorting-wrapper></table-sorting-wrapper>
                                </div>
                                <!-- ./Filters-->
                            </v-card-text>
                        </v-card>
                    </v-col>

                    <!-- Card with table -->
                    <v-col cols="12">
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
                                        :key="item.id"
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
                    </v-col>
                </v-row>
            </template>
        </users-in-jar-container>
    </v-container>
</template>

<script>
import { ref, inject, watch, computed } from "vue";
import { useApi } from "@/api/composables/useApi";
import { getExpense } from "@/api/expensesApi";

import { useUserStore } from "@/stores/UserStore";
import { useJarStore } from "@/stores/JarStore";

import PageTitleWrapper from "@/components/General/PageTitleWrapper.vue";
import ExpenseDatePicker from "@/components/Pickers/DatePicker.vue";
import TableFilterWrapper from "./History/components/TableFilterWrapper.vue";
import UsersInJarContainer from "./History/components/UsersInJarContainer.vue";
import TransanctionsTableWrapper from "./History/components/TransanctionsTableWrapper.vue";
import TransanctionCard from "@/components/General/TransactionCard.vue";
import TransactionAvatarProvider from "./History/components/TransactionAvatarProvider.vue";
import TransanctionAvatar from "./History/components/TransanctionAvatar.vue";
import TableSearch from "./History/components/TableSearch.vue";
import TableSortingWrapper from "./History/components/TableSortingWrapper.vue";

import { debounce } from "@/helpers/debounce";
import { sortingConstants } from "@/common/sortingConstants.js";

export default {
    name: "HistoryPage",

    components: {
        ExpenseDatePicker,
        TableFilterWrapper,
        TransanctionsTableWrapper,
        TransanctionCard,
        TransactionAvatarProvider,
        UsersInJarContainer,
        TransanctionAvatar,
        TableSearch,
        PageTitleWrapper,
        TableSortingWrapper,
    },

    setup() {
        const $date = inject("date");
        const monthSelected = ref($date().format("MMMM"));
        const userStore = useUserStore();
        const jarStore = useJarStore();

        const jarLabel = computed(() => jarStore.label);
        const sortingOption = computed(() => {
            let combinedSorting = `${sortingConstants[jarStore.sortingDirection]}${jarStore.sortingOption}`;
            return combinedSorting;
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

        const selectedDate = ref({});
        const transactions = ref([]);
        const search = ref(null);
        const category_id = ref(null);
        const user_created = ref(null);

        // Watchers
        watch(selectedDate, fetchCurrentJarExpenses, {
            immediate: false,
            deep: true
        });

        watch(search, debounce(fetchCurrentJarExpenses, 600));

        watch(category_id, fetchCurrentJarExpenses);

        watch(user_created, fetchCurrentJarExpenses);

        watch(sortingOption, fetchCurrentJarExpenses);
        
        return {
            monthSelected,
            selectedDate,
            transactions,
            search,
            category_id,
            user_created,
            jarId: userStore.active_jar,
            jarLabel
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

            if ( user_created.value ) {
                filter["_and"][0]["_and"][3] = {
                    "user_created": {
                        "_eq": `${user_created.value}`
                    }
                }
            }

            const payload = {
                params: {
                    filter: JSON.stringify(filter),
                    search: search.value ?? null,
                    sort: sortingOption.value
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