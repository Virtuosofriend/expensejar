<template>
    <v-container>
        test
    </v-container>
</template>
<!-- 
<script>
import { withAsync } from "@/helpers/withAsync"
import { apiStatus } from "@/api/constants/apiStatus"
import { apiStatusComputed } from "@/api/helpers/computedApiStatus"
import { fetchTotalMonthExpenses } from "@/api/expensesApi.js"

import MonthsSlideGroup from "./History/components/MonthsSlideGroup";
import TranscactionsList from "./History/components/ExpensesDataIterator";
import YearsDropdown from "./History/components/YearsDropdownSelectMenu.vue";

export default {
    name: "HistoryView",

    components: {
        MonthsSlideGroup,
        TranscactionsList,
        YearsDropdown,
        ExpensesFilterTransaction: () => import("./History/components/ExpensesFilterTransactionType.vue")
    },

    data() {
        return {
            yearSelected:   this.$date().year(),
            monthSelected:  this.$date().month() + 1,
            expensesListStatus: apiStatus.Idle,
            transactions:       [],
            OriginalTransactions: [],
            search:             ""
        }
    },

    computed: {
        ...apiStatusComputed("expensesListStatus"),

        monthNameSelected() {
            return this.$date().month(+this.monthSelected - 1).format("MMMM");
        }
    },

    methods: {
        async fetchExpenses() {
            this.expensesListStatus = apiStatus.Pending;
            this.transactions.splice(0);
            this.OriginalTransactions.splice(0);
			const { response, error } = await withAsync(fetchTotalMonthExpenses, this.monthSelected, this.yearSelected);

			if (error) {
				this.expensesListStatus = apiStatus.Error
				return
			}

            if ( response.docs.length > 0 ) {
                let expensesListArray = [];
                response.docs.forEach(elem => {
                    let elementData = elem.data();
                    elementData.doc_id = elem.id;
                    expensesListArray.push(elementData);
                });
                this.OriginalTransactions = expensesListArray;
                this.transactions = expensesListArray;
            }

            this.expensesListStatus = apiStatus.Success;
        },

        filterExpenses(category) {
            if ( category == null ) {
                return this.transactions = this.OriginalTransactions;
            }
            this.expensesListStatus = apiStatus.Pending;
            let filtered_transactions = this.OriginalTransactions.filter(elem => elem.category === category);
            this.transactions = filtered_transactions;
            this.expensesListStatus = apiStatus.Success;
        },

        handleSearch(event) {
            this.search = event.target.value;
        }
    },

    watch: {
        yearSelected(newVal) {
            return this.fetchExpenses();
        },
        monthSelected(newVal) {
            return this.fetchExpenses();
        },
    },

    created() {
        this.fetchExpenses();
    }
}
</script> -->

<script>
export default {
    name: "HistoryPage"
}
</script>
<style lang="scss" scoped>

</style>