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
                    Back
                </v-btn>
            </v-col>

            <v-col cols="12">
                <h2 class="text-center">Add new expense</h2>
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
                                    Date of the transaction
                                </label>
                                <date-picker v-model="form.date"></date-picker>
                            </v-col>
                            
                            <v-col
                                cols="12"
                            >
                                <label class="mb-2 d-block">
                                    Transaction category
                                </label>
                                <base-expense-categories-dropdown
                                    v-model="form.category"
                                ></base-expense-categories-dropdown>
                            </v-col>

                            <v-col
                                cols="12"
                            >
                                <label class="mb-2 d-block">
                                    Transaction sum
                                </label>
                                <v-text-field
                                    v-model.number="form.amount"
                                    color="secondary"
                                    label="Amount"
                                    prefix="€"
                                    hide-details
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
                                    Transaction comment
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
                                    @click="addNewExpense()"
                                >
                                    Add new expense
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
import { createExpense } from "@/api/expensesApi.js"

import DatePicker from "@/components/General/DatePicker.vue";

export default {
    name: "CreateExpense__dialog",

    data() {
        return {
            formStatus: apiStatus.Idle,
            form: {
                amount:     null,
                date:       null,
                category:   null,
                comment:    null,
                userId:     localStorage.getItem("expenseJar_uid")
            }
        }
    },

    computed: {
		...apiStatusComputed("formStatus"),
        ...mapState({
            home: state => state.auth.homeId
        })
	},

    methods: {
        async addNewExpense() {
            this.formStatus = apiStatus.Pending
			const { response, error } = await withAsync(createExpense, {
                ...this.form,
                home: this.home
            });

			if (error) {
				this.formStatus = apiStatus.Error
				return
			}
			this.formStatus = apiStatus.Success;
        }
    },

    components: {
        DatePicker
    }
}
</script>

<style lang="scss" scoped>
label {
    opacity: .6;
    font-size: 14px;
}
</style>