<script>
import { withAsync } from "@/helpers/withAsync"
import { apiStatus } from "@/api/constants/apiStatus"
import { apiStatusComputed } from "@/api/helpers/computedApiStatus"
import { fetchResolvements } from "@/api/resolvementsApi.js"

import { mapState } from "vuex";

export default {
    name: "FetchResolvements",

    props: {
        month: {
            required:   true,
            type:       Number
        },

        year: {
            required:   true,
            type:       Number
        }
    },

    data() {
        return {
            resolvements:      [],
            fetchResolvementsStatus: apiStatus.Idle
        }
    },

    computed: {
        ...apiStatusComputed("fetchResolvementsStatus"),
        ...mapState({
            home: state => state.auth.homeId,
        }),

        resolveButtonStatus() {
            const userMonth = this.$date().month() + 1;
            const userYear = this.$date().year();

            let resultStatus = {
                status: false,
                month:  null
            };

            if ( this.month == userMonth && this.year == userYear ) {
                resultStatus.status = true;
                return resultStatus;
            }

            let found = this.resolvements.filter(elem => {
                if ( elem.month == this.month && elem.year == this.year ) {
                    return elem;
                }
                return;
            });

            if ( found.length > 0 ) {
                resultStatus.status = true;
                resultStatus.month = found;
            }
            return resultStatus;
        }
    },

    methods: {
        async fetchAllResolvements() {
            this.fetchResolvementsStatus = apiStatus.Pending;

			const { response, error } = await withAsync(fetchResolvements, this.home);

			if (error) {
				this.fetchResolvementsStatus = apiStatus.Error
				return
			}
			
            if ( response.docs.length > 0 ) {
                response.docs.forEach((elem, index) => {
                    const elementData = elem.data();
                    this.resolvements.push(elementData);
                });
            }

            this.fetchResolvementsStatus = apiStatus.Success;
            
        }
    },

    watch: {
        month(newVal) {
            this.resolveButtonStatus;
        },
        year(newVal) {
            this.resolveButtonStatus;
        }
    },

    created() {
        this.fetchAllResolvements();
    },

    render() {
        return this.$scopedSlots.default({
            resolvements: this.resolvements,
            buttonStatus: this.resolveButtonStatus
        })
    }
}
</script>