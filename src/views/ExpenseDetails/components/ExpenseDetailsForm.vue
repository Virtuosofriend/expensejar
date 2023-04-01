<template>
    <v-form
        ref="editExpenseForm"
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
                        v-slot="{ newExpenseDate }"
                        :expense-date="details.expense_date"
                    >
                        <general-date-picker 
                            :model-value="newExpenseDate"
                            @update="$event => form.expense_date = $event"
                        ></general-date-picker>
                    </date-picker-provider>
                </v-col>

                <v-col cols="12">
                    <p class="mb-2 d-block">
                        {{ $t( `UpdateExpenseDialog.userLabel` ) }}
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
                <update-expense-details-button-container
                    v-slot="{
                        isLoading,
                        handleClick,
                        updateResult,
                    }"
                    :update-payload="form"
                    :expense-id="details.id"
                >
                    <v-btn
                        depressed
                        :color="buttonColor(updateResult)"
                        block
                        :loading="isLoading"
                        :disabled="form.amount === null || form.category === null || form.comment === null || form.amount === null || !form.amount"
                        @click="handleClick"
                    >
                        <span v-if="updateResult === null">
                            {{ $t( `UpdateExpenseDialog.updateExpenseText` ) }}
                        </span>
                        <span v-if="updateResult">
                            {{ $t( `UpdateExpenseDialog.expenseUpdated` ) }}
                        </span>
                        <span v-if="updateResult === false">
                            {{ $t( `UpdateExpenseDialog.expenseUpdateError` ) }}
                        </span>
                    </v-btn>
                </update-expense-details-button-container>
                </v-col>
            </v-row>
        </v-container>
    </v-form>   
</template>

<script>
import { ref } from "vue";
import GeneralDatePicker from "@/components/General/DatePicker.vue";
import ExpenseCategoriesDropdown from "@/components/General/ExpenseCategoriesDropdown.vue";
import UsersInJarContainer from "@/views/History/components/UsersInJarContainer.vue";
import JarMembersProvider from "@/views/Home/components/JarMembersProvider.vue";
import UpdateExpenseDetailsButtonContainer from "./UpdateExpenseDetailsButtonContainer.vue";
import DatePickerProvider from "./DatePickerProvider.vue";

export default {
    name: "ExpenseDetailsForm",
    components: {
        GeneralDatePicker,
        ExpenseCategoriesDropdown,
        UsersInJarContainer,
        JarMembersProvider,
        UpdateExpenseDetailsButtonContainer,
        DatePickerProvider,
    },
    props: {
        details: {
            type: Object,
            required: true
        },
        jarId: {
            type: String,
            required: true,
        }
    },
    setup(props) {
        const form = ref({
            user_created: props.details?.user_created,
            expense_date: props.details?.expense_date,
            category: props.details?.category_id,
            amount: props.details?.amount,
            comment: props.details?.comment
        });

        function buttonColor(buttonStatus) {
            if ( buttonStatus === null ) {
                return "secondary";
            }

            return buttonStatus ? "success" : "error";
        }
        return {
            form,
            buttonColor
        }
    }
}
</script>