<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-btn
                    text
                    color="primary"
                    :to="{ name:'Home' }"
                >
                    <v-icon small class="mr-2">
                        fas fa-caret-left
                    </v-icon>
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
                                <base-expense-categories-dropdown
                                    v-model="form.category"
                                ></base-expense-categories-dropdown>
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
                                    prefix="€"
                                    hide-details
                                    type="number"
                                    solo
                                    dark
                                    autofocus
                                    background-color="primary"
                                    flat
                                ></v-text-field>
                            </v-col>

                            <v-col
                                cols="12"
                            >
                                <label class="mb-2 d-block">
                                    {{ $t( `CreateExpenseDialog.transcationComment` ) }}
                                </label>
                                <base-comment-area v-model="form.comment"></base-comment-area>
                            </v-col>

                            <v-col
                                cols="12"
                            >
                                <v-btn
                                    depressed
                                    color="primary"
                                    block
                                    :loading="formStatus_Pending"
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
import { mapState } from "vuex";
import { withAsync } from "@/helpers/withAsync"
import { apiStatus } from "@/api/constants/apiStatus"
import { apiStatusComputed } from "@/api/helpers/computedApiStatus"
import { createExpense } from "@/api/expensesApi.js";

import DatePicker from "@/components/General/DatePicker.vue";

export default {
    name: "CreateExpenseDialog",

    components: {
        DatePicker
    },

    data() {
        return {
            formStatus: apiStatus.Idle,
            form: {
                amount:     null,
                date:       null,
                category:   null,
                comment:    null,
            }
        }
    },

    computed: {
		...apiStatusComputed("formStatus"),
        ...mapState({
            home: state => state.auth.homeId,
            user: state => state.auth.userId
        })
	},

    methods: {
        async addNewExpense() {
            this.formStatus = apiStatus.Pending
			const { response, error } = await withAsync(createExpense, {
                ...this.form,
                home: this.home,
                userId: this.user
            });

			if (error) {
				this.formStatus = apiStatus.Error
				return
			}

            setTimeout(() => {
                this.formStatus = apiStatus.Success;
                this.$router.push({ name: "Home"});
            }, 1000);
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