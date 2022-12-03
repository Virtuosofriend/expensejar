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
                        class="d-flex flex-column"
                    >
                        <v-list 
                            rounded
                            subheader
                            light
                        >
                            <!-- <v-subheader>Homes</v-subheader> -->
                            <v-list-item>                               
                                <v-list-item-content>
                                    <v-list-item-subtitle>
                                        <span 
                                            class="cursor-pointer link" 
                                            @click="handleCreateHome()"
                                        >
                                            Create home
                                        </span>
                                    </v-list-item-subtitle>
                                </v-list-item-content>                                
                            </v-list-item>

                            <v-divider></v-divider>

                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-subtitle>
                                        <p 
                                            class="error--text font-weight-bold cursor-pointer" 
                                            @click="handleLogout()"
                                        >
                                            Logout
                                        </p>
                                    </v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>

                        <v-card-actions class="mt-auto pr-2">
                            <small class="secondary--text ml-auto">
                                version {{ version }}
                            </small>
                        </v-card-actions>
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
    name: "UserSettings",

    data() {
		return {
			logoutStatus: apiStatus.Idle,
            version: process.env.VUE_APP_VERSION
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
        },

        handleCreateHome() {
            this.$router.push({ name: "CreateHome" });
        }
    }
}
</script>

<style lang="scss" scoped>
.link {
    color: rgba(0, 0, 0, 0.8)
}
</style>