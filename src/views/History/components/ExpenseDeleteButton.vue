<template>
    <v-dialog
        v-model="dialog"
        width="500"
    >
        <template #activator="{ on, attrs }">
            <v-btn
                icon
                plain
                small
                color="primary"
                v-bind="attrs"
                v-on="on"
            >
                <v-icon small>
                    fas fa-times-circle
                </v-icon>
            </v-btn>
        </template>
        <v-card>
            <v-card-title class="text-h5 primary white--text">
                {{ $t( `History.removeExpenseTitle` ) }}
            </v-card-title>

            <v-card-text class="pa-6">
                <p class="text-sm">
                    You are about to <span class="font-weight-bold">delete</span> {{ expenseItem.comment }} with {{ expenseItem.amount }}€! 
                    
                    The action cannot be reverted!
                </p>
                <p class="text-center font-weight-bold mb-0">
                    {{ $t( `History.areyouSure` ) }}
                </p>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="primary"
                    text
                    @click="dialog = false"
                >
                    {{ $t( `General.cancel` )}}
                </v-btn>
                <v-btn
                    color="primary"
                    depressed
                    @click="handleDeleteButton()"
                >
                    {{ $t( `History.deleteIt` ) }}
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog> 
</template>

<script>
import { withAsync } from "@/helpers/withAsync"
import { apiStatus } from "@/api/constants/apiStatus"
import { apiStatusComputed } from "@/api/helpers/computedApiStatus"
import { deleteExpense } from "@/api/expensesApi.js";

export default {
    name: "Expense__DeleteButton",

    props: {
        expenseItem: { 
            required: true
        }
    },

    data() {
        return {
            dialog: false,
            delStatus: apiStatus.Idle,
        }
    },

    computed: {
        ...apiStatusComputed("delStatus"),
    },

    methods: {
        async handleDeleteButton() {
            this.delStatus = apiStatus.Pending
			const { response, error } = await withAsync(deleteExpense, this.expenseItem.doc_id);

			if (error) {
				this.delStatus = apiStatus.Error
				return
			}

            this.$emit("delete-expense");
            this.delStatus = apiStatus.Success;
        }
    }
}
</script>
