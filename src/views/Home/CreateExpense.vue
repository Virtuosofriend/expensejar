<template>
    <v-container class="mb-10">
        <v-row>
            <v-col cols="12">
                <v-btn
                    variant="text"
                    color="primary"
                    :to="{ name:'Home' }"
                    prepend-icon="fas fa-caret-left"
                >
                    {{ $t( `General.back` ) }}
                </v-btn>
            </v-col>

            <v-col cols="12">
                <h2 class="text-center">
                    {{ $t( `CreateExpenseDialog.addNewExpenseTitle` ) }}
                </h2>
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
                                <label class="mb-2 d-block">
                                    {{ $t( `CreateExpenseDialog.dateOfTransaction` ) }}
                                </label>
                                <date-picker v-model="form.date"></date-picker>
                            </v-col>
                            
                            <v-col
                                cols="12"
                            >
                                <label class="mb-2 d-block">
                                    {{ $t( `CreateExpenseDialog.transactionCategory` ) }}
                                </label>
                                <expense-categories-dropdown
                                    v-model="form.category"
                                ></expense-categories-dropdown>
                            </v-col>

                            <v-col
                                cols="12"
                            >
                                <label class="mb-2 d-block">
                                    {{ $t( `CreateExpenseDialog.transcationSum` ) }}
                                </label>
                                <v-text-field
                                    v-model.number="form.amount"
                                    color="secondary"
                                    :label="`${ $t('History.amount') }`"
                                    hide-details
                                    type="number"
                                    variant="filled"
                                    dark
                                    autofocus
                                    bg-color="primary"
                                    flat
                                ></v-text-field>
                            </v-col>

                            <v-col
                                cols="12"
                            >
                                <label class="mb-2 d-block">
                                    {{ $t( `CreateExpenseDialog.transcationComment` ) }}
                                </label>
                                <v-textarea
                                    v-model="form.comment"
                                    variant="filled"
                                    flat
                                    dark
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
                                    color="primary"
                                    block
                                    :loading="NewExpenseStatusPending"
                                    :disabled="form.amount === null || form.category === null || form.comment === null || form.amount === null"
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

import { useUserStore } from "@/stores/UserStore";

import DatePicker from "@/components/General/DatePicker.vue";
import ExpenseCategoriesDropdown from "@/components/General/ExpenseCategoriesDropdown.vue";

export default {
    name: "NewExpensePage",

    components: {
        DatePicker,
        ExpenseCategoriesDropdown
    },

    setup() {
        const userStore = useUserStore();

        const form = reactive({
            amount:     null,
            date:       null,
            category:   null,
            comment:    null,
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
            NewExpenseStatusPending
        }

        async function addNewExpense() {
            const payload = {
                expense_date: form.date,
                amount: form.amount,
                category_id: +form.category,
                comment: form.comment,
                jar_id: userStore.state.active_jar
            };
			await CreateNewExpenseFn(payload);

            if ( NewExpenseStatusError.value ) {
                return
            }

            if ( NewExpenseStatusSuccess.value ) {
                console.log(data.value.data.data);
            }
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