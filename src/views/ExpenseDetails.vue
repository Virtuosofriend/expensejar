<template>
    <v-container class="mb-10">
        <v-row>
            <v-col cols="12">
                <div class="d-flex">
                    <v-btn
                        variant="text"
                        color="secondary"
                        prepend-icon="fas fa-caret-left"
                        @click="handleReturnBtn"
                    >
                        {{ $t( `General.back` ) }}
                    </v-btn>
                    <delete-expense-details-container
                        v-slot="{ 
                            deleteFunction,
                            isDialogOpen,
                            handleDialog
                        }"
                        :expense-id="expenseId"
                    >
                        <v-btn
                            depressed
                            color="error"
                            class="ml-auto"
                            variant="text"
                            @click="handleDialog(!isDialogOpen.value)"
                        >
                            {{ $t( `ExpenseDetails.deleteExpenseButton` ) }}
                        </v-btn>
                        <confirmation-dialog
                            :confirmation-action="deleteFunction"
                            @close-dialog="handleReturnBtn"
                        ></confirmation-dialog>
                    </delete-expense-details-container>
                </div>
            </v-col>

            <v-col cols="12">
                <page-title-wrapper>
                    <template #default>
                        {{ $t( `ExpenseDetails.expenseDetailsTitle` ) }}
                    </template>
                </page-title-wrapper>
            </v-col>
            <v-col cols="12">
                <expense-details-form-container 
                    :expense-id="expenseId"
                >
                    <template #default="{ details, isLoadingCompleted, jarId }">
                        <expense-details-form
                            v-if="isLoadingCompleted && details?.id"
                            :details="details"
                            :jar-id="jarId"
                        ></expense-details-form>
                    </template>
                </expense-details-form-container>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import PageTitleWrapper from "@/components/General/PageTitleWrapper.vue";
import ExpenseDetailsFormContainer from "./ExpenseDetails/components/ExpenseDetailsFormContainer.vue";
import ExpenseDetailsForm from "./ExpenseDetails/components/ExpenseDetailsForm.vue";
import ConfirmationDialog from "@/components/General/ConfirmationDialog.vue";
import DeleteExpenseDetailsContainer from "./ExpenseDetails/components/DeleteExpenseDetailsContainer.vue";

export default {
    name: "ExpenseDetails",
    components: {
        PageTitleWrapper,
        ExpenseDetailsFormContainer,
        ExpenseDetailsForm,
        ConfirmationDialog,
        DeleteExpenseDetailsContainer,
    },
    setup() {
        const router = useRouter();
        const route = useRoute();
        const expenseId = computed(() => route.params.expenseId);

        return {
            handleReturnBtn,
            expenseId,
        }
        function handleReturnBtn() {
            return router.go(-1);
        }
    }
}
</script>

<style lang="scss" scoped>
</style>