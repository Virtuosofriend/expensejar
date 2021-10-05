<template>
    <div class="pa-2">
        <h3>
            My last transactions
        </h3>

        <card-last-transaction 
            v-for="item in transactions"
            :key="item.id"
            :transactionItem="item"
        ></card-last-transaction>
    </div>
</template>

<script>
import CardLastTransaction from "./components/CardLastTransactions";

export default {
    name: "Last__transactions",

    data() {
        return {
            transactions: [
                {
                    id:     1,
                    amount: 152,
                    transaction: "Supermarket",
                    date:   "05 Oct"
                },{
                    id:     2,
                    amount: 6.4,
                    transaction: "Food",
                    date:   "03 Oct"
                },{
                    id:     3,
                    amount: 12,
                    transaction: "Going out (drinks, food)",
                    date:   "02 Oct"
                }
            ]
        }
    },

    components: {
        CardLastTransaction
    }
}
</script>