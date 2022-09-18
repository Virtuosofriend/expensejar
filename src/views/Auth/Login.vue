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
                            :type="passwordField"
                            flat
                            solo
                            full-width
                            hide-details
                            :append-icon="showProperPasswordIcon"
                            @click:append="handleRevealPassword()"
                        ></v-text-field>
                    </v-col>
                    
                    <v-col
                        cols="12"
                    >
                        <v-btn
                            id="v-btn--disabled"
                            color="primary"
                            depressed
                            block
                            @click="login()"
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
import { withAsync } from "@/helpers/withAsync";
import { apiStatus } from "@/api/constants/apiStatus";
import { apiStatusComputed } from "@/api/helpers/computedApiStatus";
import { loginUser } from "@/api/authApi.js";

// Components import
import AuthPageTemplate from "./components/AuthPageTemplate";

export default {
	name: "LoginPage",

    components: {
        AuthPageTemplate
    },

	data() {
		return {
			loginStatus: apiStatus.Idle,
            password:  "",
            username: "",
            passwordField: "password"
		}
	},

	computed: {
		...apiStatusComputed("loginStatus"),

        showProperPasswordIcon() {
            return this.passwordField == "password" ? "fa-sm fas fa-eye" : "fa-sm fas fa-eye-slash";
        }
	},

	methods: {
		async login() {
			this.loginStatus = apiStatus.Pending

			const payload = {
				email: this.username,
				password: this.password,
			};

			const { response, error } = await withAsync(loginUser, payload);

			if (error) {
				this.loginStatus = apiStatus.Error
				return
			}
			this.loginStatus = apiStatus.Success;
            this.$store.dispatch("auth/setUser", response.user.uid);
            
            if ( response.additionalUserInfo.isNewUser ) {
                return this.$router.push({ name: "Onboarding", query: { email: response.user.email }});
            }
            return this.$router.push({ name: "Welcome" });
            
		},

        handleRevealPassword() {
            this.passwordField == "password" ? this.passwordField = "text" : this.passwordField = "password";
        }
	}
}
</script>

<style lang="scss" scoped>

</style>