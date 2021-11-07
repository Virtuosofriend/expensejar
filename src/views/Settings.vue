<template>
    <v-container>
        <section>
            <v-row no-gutters>
                <v-col cols="12">
                    <div class="d-flex align-center my-2">
                        <h2 class="text-center w-100">
                            Settings
                        </h2>
                    </div>
                </v-col>
                <v-col cols="12">
                    <v-card
                        color="white"
                        elevation="0"
                        dark
                        min-height="250"
                    >
                        <v-btn
                            color="error"
                            depressed
                            :loading="logoutStatus_Pending"
                            @click="handleLogout()"
                        >
                            Logout
                        </v-btn>
                    </v-card>
                </v-col>
            </v-row>
        </section>
    </v-container>

</template>

<script>
import { withAsync } from "@/helpers/withAsync"
import { apiStatus } from "@/api/constants/apiStatus"
import { apiStatusComputed } from "@/api/helpers/computedApiStatus"
import { logoutUser } from "@/api/authApi.js"


export default {
    name: "User__settings",

    data() {
		return {
			logoutStatus: apiStatus.Idle
		}
	},

	computed: {
		...apiStatusComputed("logoutStatus"),
	},

    methods: {
        async handleLogout() {
            this.logoutStatus = apiStatus.Pending

			const { response, error } = await withAsync(logoutUser);

			if (error) {
				this.logoutStatus = apiStatus.Error
				return
			}
			this.logoutStatus = apiStatus.Success;
            this.$store.dispatch("auth/logoutUser");
            return this.$router.push({ name: "Login" });
        }
    }
}
</script>

<style lang="scss" scoped>

</style>