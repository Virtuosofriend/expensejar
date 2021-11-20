<template>
    <div class="pa-2">
        <h3>
            {{ $t( `Homepage.lastTransactions` ) }}
        </h3>
        <v-responsive
            height="270px"
            class="overflow-y-auto"
            v-if="transactions.length > 0"
        >
            <card-transactions 
                v-for="item in transactions"
                :key="item.id"
                :transactionItem="item"
            ></card-transactions>
        </v-responsive>

        <div v-else>
            <p class="mt-4 text-sm">
                {{ $t( `Homepage.noRecentTransactions` ) }}
            </p>
        </div>
    </div>
</template>

<script>
import CardTransactions from "./components/CardTransactions";

import { mapState } from "vuex";
import { withAsync } from "@/helpers/withAsync"
import { apiStatus } from "@/api/constants/apiStatus"
import { apiStatusComputed } from "@/api/helpers/computedApiStatus"
import { fetchLastFiveTransactions } from "@/api/expensesApi.js"

export default {
    name: "Last__transactions",

    data() {
        return {
            transactionStatus: apiStatus.Idle,
            transactions: []
        }
    },

    computed: {
		...apiStatusComputed("transactionStatus"),
        ...mapState({
            home: state => state.auth.homeId,
            user: state => state.auth.userId
        })
	},

    methods: {
        async fetchExpenses() {
            this.transactionStatus = apiStatus.Pending;
			const { response, error } = await withAsync(fetchLastFiveTransactions, {
                home: this.home,
                userId: this.user
            });

			if (error) {
				this.transactionStatus = apiStatus.Error;
				return
			}

            if ( response.docs.length > 0 ) {
                response.docs.forEach((elem, index) => {
                    const elementData = elem.data();
                    let properDate = this.$date(elementData.date).format("DD MMM");
                    const dataToBeMerged = {
                        id:     index,
                        date:   properDate,
                        amount: elementData.amount,
                        transaction:    elementData.category,
                        createdAt:      elementData.createdAt,
                        originalDate:   elementData.date
                    };

                    this.transactions.push(dataToBeMerged);
                });

                this.transactions.sort((a,b) => {
                    const older = this.$date(b.originalDate,"YYYY-MM-DD", true);
                    const newer = this.$date(a.originalDate,"YYYY-MM-DD", true);
                    return older.valueOf() - newer.valueOf();
                }).splice(4);
            }

			this.transactionStatus = apiStatus.Success;
        }
    },

    created() {
        this.fetchExpenses();
    },

    components: {
        CardTransactions
    }
}
</script>