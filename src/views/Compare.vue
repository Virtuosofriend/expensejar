<template>
    <v-container>
        <users-in-jar-container
            :jar-id="jarId"
        >
            <template #default="{ members }">
                <v-row dense>
                    <v-col
                        cols="12"
                    >
                        <page-title-wrapper>
                            <template #default>
                                {{ $t( `Compare.compareTitle` ) }}
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
                                <date-picker-provider>
                                    <template #default="{ dateSelected }">
                                        <expense-date-picker 
                                            v-model="selectedDate"
                                            :value="dateSelected"
                                            class="my-2"
                                        ></expense-date-picker>
                                    </template>
                                </date-picker-provider>
                                <div 
                                    v-if="totalTransanctions.length > 0 && selectedDate.year"
                                    class="ml-auto d-flex"
                                >
                                    <resolvement-container
                                        :jar-id="jarId"
                                        :selected-date="selectedDate"
                                        :month-is-resolved="isMonthResolved"
                                    ></resolvement-container>
                                </div>
                            </v-card-text>
                        </v-card>
                    </v-col>

                    <!-- Card with table -->
                    <jar-expenses-container 
                        v-if="totalTransanctions.length > 0 && members.length > 0"
                        v-slot="{
                            expensesPerUser,
                            totalExpenses
                        }"
                        :members="members"
                        :total-transanctions="totalTransanctions"
                    >
                        <v-col 
                            v-for="member in members"
                            :key="member.id"
                            cols="6"
                        >
                            <v-card
                                color="primary"
                                elevation="0"
                                dark
                                height="100"
                            >
                                <v-container class="fill-height">
                                    <v-row 
                                        dense
                                        align="center"
                                    >
                                        <v-col cols="5">
                                            <jar-members-card-avatar
                                                :avatar-url="member.avatar"
                                            ></jar-members-card-avatar>
                                        </v-col>
                                        <v-col cols="7">
                                            <jar-members-expense-card-wrapper>
                                                <template #default>
                                                    <h6 class="font-weight-bold">
                                                        {{ expensesPerUser[member.id].total }}€
                                                    </h6>
                                                    <p class="text-xs text-accent">
                                                        {{ expensesPerUser[member.id].percentage }}%
                                                    </p>
                                                </template>
                                            </jar-members-expense-card-wrapper>
                                        </v-col>
                                        <v-col cols="12">
                                            <expenses-owes-provider 
                                                v-slot="{userOwesMoney, owedMoney}"
                                                :members-expenses="expensesPerUser"
                                                :user-id="member.id"
                                            >
                                                <v-chip 
                                                    v-if="userOwesMoney"
                                                    :color="isMonthResolved ? 'accent' : 'error'"
                                                    label
                                                    variant="text"
                                                    size="small"
                                                    class="d-flex justify-center font-weight-bold"
                                                >
                                                    <span v-if="!isMonthResolved">
                                                        {{ $t( `Compare.owes` ) }}: {{ owedMoney }}€
                                                    </span>
                                                    <span v-else>
                                                        {{ $t( `Compare.paid` ) }}: {{ owedMoney }}€
                                                    </span>
                                                </v-chip>
                                            </expenses-owes-provider>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-card>
                        </v-col>
                        <v-col cols="12">
                            <expenses-per-category-provider 
                                :total-expenses="totalTransanctions"
                                :members="members"
                                :month-total-expenses="totalExpenses"
                            >
                                <template #default="{ barGraphData, graphCategories, pieGraphData }">
                                    <v-card
                                        color="primary"
                                        elevation="0"
                                        dark
                                        height="520"
                                    >
                                        <h6 class="font-weight-bold text-center">
                                            Stats
                                        </h6>
                                        <bar-columns-graph
                                            :graph-data="barGraphData"
                                            :graph-categories="graphCategories"
                                        ></bar-columns-graph>
                                    </v-card>
                                    <v-card
                                        class="mt-4"
                                        color="primary"
                                        elevation="0"
                                        dark
                                        height="300"
                                    >
                                        <pie-graph
                                            :graph-data="pieGraphData"
                                        ></pie-graph>
                                    </v-card>
                                </template>
                            </expenses-per-category-provider>
                        </v-col>
                    </jar-expenses-container>
                    <v-col 
                        v-else 
                        cols="12"
                    >
                        <v-card
                            
                            color="primary"
                            elevation="0"
                            dark
                            min-height="250"
                        >
                            <base-no-content>
                                <p>
                                    {{ $t(`Compare.noExpensesFound`) }}
                                </p>
                            </base-no-content>
                        </v-card>
                    </v-col>
                </v-row>
            </template>
        </users-in-jar-container>
    </v-container>
</template>

<script>
import { ref, watch, computed } from "vue";
import { useApi } from "@/api/composables/useApi";
import { getExpense } from "@/api/expensesApi";

import { useUserStore } from "@/stores/UserStore";
import { useJarStore } from "@/stores/JarStore";

import PageTitleWrapper from "@/components/General/PageTitleWrapper.vue";
import ExpenseDatePicker from "@/components/Pickers/DatePicker.vue";
import UsersInJarContainer from "./History/components/UsersInJarContainer.vue";
import DatePickerProvider from "./Compare/components/DatePickerProvider.vue";

import JarMembersCardAvatar from "./Compare/components/JarMembersCardAvatar.vue";
import ExpensesOwesProvider from "./Compare/components/ExpensesOwesProvider.vue";
import JarExpensesContainer from "./Compare/components/JarExpensesContainer.vue";
import JarMembersExpenseCardWrapper from "./Compare/components/JarMembersExpenseCardWrapper.vue";
import ExpensesPerCategoryProvider from "./Compare/components/ExpensesPerCategoryProvider.vue";
import BarColumnsGraph from "@/components/Charts/BarColumnsGraph.vue";
import PieGraph from "../components/Charts/PieGraph.vue";
import ResolvementContainer from "./Compare/components/Resolvement/ResolvementContainer.vue";

export default {
    name: "ComparePage",

    components: {
        ExpenseDatePicker,
        UsersInJarContainer,
        PageTitleWrapper,
        DatePickerProvider,
        JarMembersCardAvatar,
        ExpensesOwesProvider,
        JarExpensesContainer,
        JarMembersExpenseCardWrapper,
        ExpensesPerCategoryProvider,
        BarColumnsGraph,
        PieGraph,
        ResolvementContainer,
    },

    setup() {
        const userStore = useUserStore();
        const jarStore = useJarStore();
        const isMonthResolved = computed(() => jarStore.isMonthResolved);

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
        const totalTransanctions = ref([]);
        

        // Watchers
        watch(selectedDate, fetchCurrentJarExpenses, {
            immediate: false,
            deep: true
        });
        
        return {
            selectedDate,
            jarId: userStore.active_jar,
            totalTransanctions,
            isMonthResolved
        }

        async function fetchCurrentJarExpenses() {
            let filter = {"_and":[{"_and":[{"jar_id":{"id":{"_eq":`${ userStore.active_jar }`}}},{"year(expense_date)": {
                        "_eq": `${ selectedDate.value.year }`
                    }},{
                        "month(expense_date)": {"_eq": `${ selectedDate.value.month + 1 }`}}
                ]}]};

            const payload = {
                params: {
                    filter: JSON.stringify(filter),
                }
            };

			await getExpensesFn(payload);

            if ( FetchExpensesStatusError.value ) {
                return
            }

            return totalTransanctions.value = data.value.data.data;
        }
    }
}
</script>