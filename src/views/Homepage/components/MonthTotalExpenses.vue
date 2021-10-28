<script>
import { mapState } from "vuex";
import { withAsync } from "@/helpers/withAsync"
import { apiStatus } from "@/api/constants/apiStatus"
import { apiStatusComputed } from "@/api/helpers/computedApiStatus"
import { fetchTotalMonthExpenses } from "@/api/expensesApi.js"

export default {
    name: "MonthTotalExpenses",

    props: {
        month: {
            required:   true
        }
    },

    data() {
        return {
            transactionStatus: apiStatus.Idle,
            totalExpenses:      0,
            percentageOfHome:   0
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
        async fetchTotalMonthExpenses() {
            this.transactionStatus = apiStatus.Pending;
			const { response, error } = await withAsync(fetchTotalMonthExpenses, this.month);

			if (error) {
				this.transactionStatus = apiStatus.Error
				return
			}

            if ( response.docs.length > 0 ) {
                let homeTotalExpenses = 0;

                response.docs.forEach(elem => {
                    const elementData = elem.data();
                    homeTotalExpenses += elementData.amount;
                    if ( this.home == elementData.home && this.user == elementData.userId ) {
                        this.totalExpenses += elementData.amount;
                    }
                });

                this.percentageOfHome = Math.floor(this.totalExpenses * 100 / homeTotalExpenses);
            }

			this.transactionStatus = apiStatus.Success;
        }
    },

    created() {
        this.fetchTotalMonthExpenses();
    },

    render() {
        return this.$scopedSlots.default({
            totalExpenses: this.totalExpenses,
            percentageOfHome: this.percentageOfHome
        });
    }
}
</script>