<template>
    <v-container class="mb-10">
        <v-row>
            <v-col cols="12">
                <v-btn
                    variant="text"
                    color="secondary"
                    prepend-icon="fas fa-caret-left"
                    @click="handleReturnBtn"
                >
                    {{ $t( `General.back` ) }}
                </v-btn>
            </v-col>

            <v-col cols="12">
                <page-title-wrapper>
                    <template #default>
                        {{ $t( `CreateExpenseDialog.addNewExpenseTitle` ) }}
                    </template>
                </page-title-wrapper>
            </v-col>

            <v-col cols="12">
                <v-form 
                    ref="expenseForm"
                    class="pa-1"
                >
                    <v-container fluid>
                        <v-row>
                            <v-col
                                cols="12"
                            >
                                <p class="mb-2 d-block">
                                    {{ $t( `CreateExpenseDialog.dateOfTransaction` ) }}
                                </p>
                                <date-picker-provider
                                    v-slot="{ currentDate }"
                                >
                                    <general-date-picker 
                                        :model-value="currentDate"
                                        @update="$event => form.date = $event"
                                    ></general-date-picker>
                                </date-picker-provider>
                            </v-col>

                            <v-col cols="12">
                                <p class="mb-2 d-block">
                                    User
                                </p>
                                <users-in-jar-container
                                    :jar-id="jarId"
                                >
                                    <template #default="{ members }">
                                        <jar-members-provider
                                            :members-array="members"
                                        >
                                            <template #default="{ users }">
                                                <jar-members-dropdown
                                                    v-model="form.user_created"
                                                    :members="users"
                                                    @update:modelValue="updateMemberModel"
                                                ></jar-members-dropdown>
                                            </template>
                                        </jar-members-provider>
                                    </template>
                                </users-in-jar-container>
                            </v-col>
                            
                            <v-col
                                cols="12"
                            >
                                <p class="mb-2 d-block">
                                    {{ $t( `CreateExpenseDialog.transactionCategory` ) }}
                                </p>
                                <expense-categories-dropdown
                                    v-model="form.category"
                                ></expense-categories-dropdown>
                            </v-col>

                            <v-col
                                cols="12"
                            >
                                <p class="mb-2 d-block">
                                    {{ $t( `CreateExpenseDialog.transcationSum` ) }}
                                </p>
                                <v-text-field
                                    v-model.number="form.amount"
                                    color="secondary"
                                    :label="`${ $t('History.amount') }`"
                                    hide-details
                                    type="number"
                                    variant="solo"
                                    autofocus
                                    bg-color="primary"
                                ></v-text-field>
                            </v-col>

                            <v-col
                                cols="12"
                            >
                                <p class="mb-2 d-block">
                                    {{ $t( `CreateExpenseDialog.transcationComment` ) }}
                                </p>
                                <v-textarea
                                    v-model="form.comment"
                                    variant="solo"
                                    bg-color="primary" 
                                    hide-details
                                    name="commentText"
                                    label="Masoutis, groceries..."
                                ></v-textarea>
                            </v-col>

                            <v-col
                                cols="12"
                            >
                                <v-btn
                                    depressed
                                    color="secondary"
                                    block
                                    :loading="NewExpenseStatusPending"
                                    :disabled="form.amount === null || form.category === null || form.comment === null || form.amount === null || !form.amount"
                                    @click="addNewExpense()"
                                >
                                    {{ $t( `CreateExpenseDialog.addNewExpenseButton` ) }}
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-form>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { reactive } from "vue";
import { useApi } from "@/api/composables/useApi";
import { newExpense } from "@/api/expensesApi";
import { useRouter } from "vue-router";
import routeNames from "@/common/constants/routeNames";

import { useUserStore } from "@/stores/UserStore";

import PageTitleWrapper from "@/components/General/PageTitleWrapper.vue";
import GeneralDatePicker from "@/components/General/DatePicker.vue";
import ExpenseCategoriesDropdown from "@/components/General/ExpenseCategoriesDropdown.vue";
import UsersInJarContainer from "@/views/History/components/UsersInJarContainer.vue";
import JarMembersProvider from "./components/JarMembersProvider.vue";
import DatePickerProvider from "./components/DatePickerProvider.vue";

export default {
    name: "NewExpensePage",

    components: {
        GeneralDatePicker,
        ExpenseCategoriesDropdown,
        PageTitleWrapper,
        UsersInJarContainer,
        JarMembersProvider,
        DatePickerProvider,
    },

    setup() {
        const userStore = useUserStore();

        const router = useRouter();

        const form = reactive({
            amount:     null,
            date:       null,
            category:   null,
            comment:    null,
            user_created:     userStore.profile.id
        });

        // API layer variables
        const {
            data,
            exec: CreateNewExpenseFn,
            NewExpenseStatusSuccess,
            NewExpenseStatusError,
            NewExpenseStatusIdle,
            NewExpenseStatusPending
        } = useApi("NewExpense", newExpense);

        return {
            form,
            addNewExpense,
            NewExpenseStatusPending,
            handleReturnBtn,
            jarId: userStore.active_jar,
        }

        async function addNewExpense() {
            const payload = {
                expense_date: form.date,
                amount: form.amount,
                category_id: +form.category,
                comment: form.comment,
                jar_id: userStore.active_jar,
                user_created: form.user_created
            };
			await CreateNewExpenseFn(payload);

            if ( NewExpenseStatusError.value ) {
                return
            }

            if ( NewExpenseStatusSuccess.value ) {
                router.push({ name: routeNames.HOME })
            }
        }

        function handleReturnBtn() {
            return router.go(-1);
        }
    }
}
</script>

<style lang="scss" scoped>
label {
    opacity: .6;
    font-size: 14px;
}
</style>