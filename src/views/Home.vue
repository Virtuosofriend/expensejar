<template>
	<v-container v-if="!loadingState">
		<fetch-month-expenses-container
			v-slot="{
				monthlyExpenseLimit,
				activeUserId,
				expensesList,
				userLastTransanctions,
				resultSuccess,
				shouldShowExpensesList,
				members
			}"
		>
			<section v-if="resultSuccess">
				<v-row no-gutters>
					<v-col cols="12">
						<current-month-expenses-summary-card-provider
							v-if="shouldShowExpensesList"
							v-slot="{ 
								activeUserSummary,
								currentMonth,
								currentYear,
							}"
							:jar-members="members"
							:total-expenses="expensesList"
							:active-user-id="activeUserId"
						>
							<router-link :to="{ name: HISTORY, query: { month: currentMonth, year: currentYear }}">
								<current-month-expenses-summary-card
									class="mb-2"
									:summary-expense="activeUserSummary"
								/>
							</router-link>
						</current-month-expenses-summary-card-provider>
						<current-month-expenses-summary-card
							v-else
							class="mb-2"
							summary-expense="0"
						/>
					</v-col>
					<v-col cols="12">
						<current-month-stacked-graph-provider
							v-if="shouldShowExpensesList"
							v-slot="{
								primaryUserPercentage,
								secondaryUserPercentage,
							}"
							:monthly-expense-limit="monthlyExpenseLimit"
						>
							<current-month-all-expenses-graph-wrapper
								:primary-user-percentage="primaryUserPercentage"
								:secondary-user-percentage="secondaryUserPercentage"
								:month-limit="monthlyExpenseLimit"
								class="my-2"
							/>
						</current-month-stacked-graph-provider>
					</v-col>
					<v-col cols="12">
						<current-month-members-expenses-container
							v-if="shouldShowExpensesList"
							v-slot="{ jarMembers }"
						>
							<v-row>
								<v-col 
									v-for="member in jarMembers"
									:key="member.id"
									cols="6"
								>
									<current-month-member-expense-card
										:expense="member.monthlyExpensesSummary"
										:member-name="member.first_name"
										:color="member.color"
										class="my-2"
									/>
								</v-col>
							</v-row>
						</current-month-members-expenses-container>
					</v-col>
					<v-col cols="12">
						<fetch-total-expenses-container
							v-slot="{ 
								sumExpensesPerMonth,
								fetchSuccess
							}"
						>
							<member-total-months-chart
								v-if="fetchSuccess"
								:chart-data="sumExpensesPerMonth"
								class="my-2"
							/>
						</fetch-total-expenses-container>
					</v-col>

					<!-- Last 5 transactions table -->

					<v-col class="col-12 mt-4">
						<last-user-transanctions-provider
							v-if="shouldShowExpensesList"
							v-slot="{ lastExpensesList, shouldShowList }"
							:expenses-list="userLastTransanctions"
						>
							<div
								v-if="shouldShowList"
								class="pa-2"
							>
								<h6>
									{{ $t( `Homepage.lastTransactions` ) }}
								</h6>
								<user-last-transanctions-list
									:expenses-list="lastExpensesList"
								/>
							</div>
							<!-- <div v-else>
                                <p class="mt-4 text-sm">
                                    {{ $t( `Homepage.noRecentTransactions` ) }}
                                </p>
                            </div> -->
						</last-user-transanctions-provider>
					</v-col>
				</v-row>
			</section>
		</fetch-month-expenses-container>
	</v-container>
</template>

<script setup>
import FetchMonthExpensesContainer from "./Home/components/containers/FetchMonthExpensesContainer.vue";
import CurrentMonthExpensesSummaryCardProvider from "./Home/components/providers/CurrentMonthExpensesSummaryCardProvider.vue";
import CurrentMonthExpensesSummaryCard from "./Home/components/CurrentMonthExpensesSummaryCard.vue";
import CurrentMonthStackedGraphProvider from "./Home/components/providers/CurrentMonthStackedGraphProvider.vue";
import CurrentMonthAllExpensesGraphWrapper from "./Home/components/CurrentMonthAllExpensesGraphWrapper.vue";
import CurrentMonthMembersExpensesContainer from "./Home/components/containers/CurrentMonthMembersExpensesContainer.vue";
import CurrentMonthMemberExpenseCard from "./Home/components/CurrentMonthMemberExpenseCard.vue";
import FetchTotalExpensesContainer from "./Home/components/containers/FetchTotalExpensesContainer.vue";
import MemberTotalMonthsChart from "./Home/components/MemberTotalMonthsChart.vue";
import LastUserTransanctionsProvider from "./Home/components/providers/LastUserTransanctionsProvider.vue";
import UserLastTransanctionsList from "./Home/components/UserLastTransanctionsList.vue";

import { routeNames } from "@/common/constants/routeNames";
import { getExpenseCategories } from "@/helpers/fetchGeneralCollections";
import { useGeneralStore } from "@/stores/GeneralStore";
import { defineOptions, onMounted, ref } from "vue";

defineOptions({
    name: "HomeView"
});

const HISTORY = ref(routeNames.HISTORY);
const GeneralStore = useGeneralStore();

// Loading state of the whole app
// Wait until all the general configuration is fetched and set
const loadingState = ref(true);
onMounted( async () => {
    const categories = await getExpenseCategories();
    GeneralStore.setExpenseCategories(categories);
    loadingState.value = false;
});
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