<template>
    <v-container>
         <!-- Monthly statistics -->

        <section>
            <v-row no-gutters>
                <v-col cols="12">
                    <v-card
                        elevation="0"
                        color="primary"
                        dark
                        min-height="250"
                    >
                        <v-card-title>
                            October overview
                        </v-card-title>
                        <v-card-text 
                            class="text-h4 secondary--text"
                        >
                                <small class="text-overline d-block">
                                    spent
                                </small>
                                650€ 
                                <small class="month__currentExpense">
                                    62% of the total in the home
                                </small>
                        </v-card-text>
                        <v-divider class="mx-4"></v-divider>
                        <v-card-text
                            class="text-body secondary--text"
                        >
                            Previous month: <span class="font-weight-bold">784.56€</span>
                        </v-card-text>
                    </v-card>
                    <div class="position-relative d-flex justify-center month__newexpense">
                        <v-btn 
                            color="secondary"
                            block
                            class="primary--text shadow"
                            
                        >
                            Create new expense
                        </v-btn>
                    </div>
                </v-col>

                <!-- Last 5 transactions table -->

                <v-col cols="12">
                    <last-transactions class="mt-6"></last-transactions>
                </v-col>
            </v-row>
        </section>
    </v-container>
</template>

<script>
import LastTransactions from "./Homepage/LastTransactionsList.vue";

export default {
    name: "Home__view",
    
    components: {
        LastTransactions
    }
}
</script>

<style lang="scss" scoped>
section {
    margin-bottom: 36px;
}

.month__newexpense {
    width: 50%;
    margin-left: auto;
    margin-right: auto;
    margin-top: -20px;
}

.month__currentExpense {
    font-size:12px; 
    display: inline-block; 
    margin-left: 4px;
}
</style>