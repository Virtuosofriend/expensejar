<script>
import { withAsync } from "@/helpers/withAsync"
import { apiStatus } from "@/api/constants/apiStatus"
import { apiStatusComputed } from "@/api/helpers/computedApiStatus"
import { fetchHomes, fetchCoHostedHomes } from "@/api/homesApi.js"
import { mapState } from "vuex";

const proccessList = response => {
    let result = [];
    response.docs.forEach(elem => {
        const elementData = elem.data();
        const elementId = elem.id;
        result.push({
            label: elementData.label,
            value:  elementId
        });
    });

    return result;
};

export default {
    name: "HomesListFetcher",

    data() {
        return {
            homes:      [],
            homeStatus: apiStatus.Idle
        }
    },

    computed: {
        ...apiStatusComputed("homeStatus"),

        ...mapState({
            userId: state => state.auth.userId
        })
    },

    methods: {
        async fetchUserHomes() {
            this.homeStatus = apiStatus.Pending;
			const { response, error } = await withAsync(fetchHomes, this.userId);

			if (error) {
				this.homeStatus = apiStatus.Error
				return
			}
			
            if ( response.docs.length > 0 ) {
                this.homes = proccessList(response);
            } else {
                const { response, error } = await withAsync(fetchCoHostedHomes, this.userId);
                if (error) {
                    this.homeStatus = apiStatus.Error
                    return
                }

                if ( response.docs.length > 0 ) {
                    this.homes = proccessList(response);
                }
            }

            this.homeStatus = apiStatus.Success;
            
        }
    },

    created() {
        this.fetchUserHomes();
    },

    render() {
        return this.$scopedSlots.default({
            homes: this.homes,
            loading: this.homeStatus_Success
        })
    }
}
</script>