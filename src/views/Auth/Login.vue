<template>
	<auth-page-template>
        <template #formContent>
            <v-form
                ref="loginForm"
                class="pa-2"
            >
                <v-row>
                    <v-col cols="12">
                        <label class="authForm__label">
                            {{ $t( `Login.useEmail` ) }}
                        </label>
                        <v-text-field
                            v-model="username"
                            :label="`${ $t('Login.fields.name') }`"
                            flat
                            full-width
                            color="secondary"
                            solo
                            hide-details
                        ></v-text-field>
                    </v-col>

                    <v-col cols="12">
                        <label class="authForm__label">
                            {{ $t( `Login.fields.password` ) }}
                        </label>
                        <v-text-field
                            v-model="password"
                            :label="`${ $t('Login.fields.password') }`"
                            flat
                            solo
                            full-width
                            hide-details
                            append-icon="fa-sm fas fa-eye"
                        ></v-text-field>
                    </v-col>
                    
                    <v-col
                        cols="12"
                    >
                        <v-btn
                            color="primary"
                            depressed
                            block
                            @click="login()"
                            id="v-btn--disabled"
                        >
                            {{ $t( `Login.fields.loginBtn` ) }}
                        </v-btn>
                    </v-col>
                </v-row>
            </v-form>
        </template>
    </auth-page-template>
</template>

<script>
import { withAsync } from "@/helpers/withAsync"
import { apiStatus } from "@/api/constants/apiStatus"
import { apiStatusComputed } from "@/api/helpers/computedApiStatus"
import { loginUser } from "@/api/authApi.js"

// Components import
import AuthPageTemplate from "./components/AuthPageTemplate";

export default {
	name: "Login__page",

	data() {
		return {
			loginStatus: apiStatus.Idle,
            password:  "",
            username: ""
		}
	},

	computed: {
		...apiStatusComputed("loginStatus"),
	},

	methods: {
		login() {
            
			// this.loginStatus = apiStatus.Pending

			// const payload = {
			// 	email: "dsakellariou@test.com",
			// 	password: "testpass",
			// }

			// const { response, error } = await withAsync(loginUser, payload)

			// if (error) {
			// 	this.loginStatus = apiStatus.Error
			// 	return
			// }
			// Add token to the api object
			// this.loginStatus = apiStatus.Success;
            return this.$router.push({ name: "Welcome" });
            
		},
	},

    components: {
        AuthPageTemplate
    }
}
</script>

<style lang="scss" scoped>

</style>