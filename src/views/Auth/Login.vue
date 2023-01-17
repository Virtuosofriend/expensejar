<template>
	<auth-page-template>
        <template #formContent>
            <v-form
                ref="loginForm"
                class="pa-2"
            >
                <v-row>
                    <v-col cols="12">
                        <v-text-field
                            v-model="email"
                            :label="`${ $t('Login.fields.name') }`"
                            flat
                            full-width
                            color="secondary"
                            variant="solo"
                            hide-details
                        ></v-text-field>
                    </v-col>

                    <v-col cols="12">
                        <v-text-field
                            v-model="password"
                            :label="`${ $t('Login.fields.password') }`"
                            :type="passwordField"
                            flat
                            variant="solo"
                            full-width
                            hide-details
                            :append-inner-icon="showProperPasswordIcon"
                            @click:appendInner="handleRevealPassword()"
                        ></v-text-field>
                    </v-col>
                    
                    <v-col
                        cols="12"
                    >
                        <v-btn
                            :disabled="!password || !email"
                            color="secondary"
                            depressed
                            block
                            @click="handleLogin()"
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
import { ref, computed } from "vue";
import { useApi } from "@/api/composables/useApi";
import { loginUser } from "@/api/authApi";
import { setCookiesAuthetication } from "@/helpers/authenticationCookie";
import { useRouter } from "vue-router"

import AuthPageTemplate from "./components/AuthPageTemplate.vue";

export default {
	name: "LoginPage",

    components: {
        AuthPageTemplate
    },

    setup() {
        // General variables
        const router = useRouter();

        // Form variables
        const email = ref("");
        const password = ref("");
        const passwordField = ref("password");

        // API layer variables
        const {
            data,
            exec: loginUserFn,
            LoginUserStatusSuccess,
            LoginUserStatusError,
            LoginUserStatusIdle,
            LoginUserStatusPending
        } = useApi("LoginUser", loginUser);

        // Password eye hint behavior
        const showProperPasswordIcon = computed(() => {
            return passwordField.value == "password" ? "fa-sm fas fa-eye" : "fa-sm fas fa-eye-slash";
        });

        function handleRevealPassword() {
            return passwordField.value == "password" ? passwordField.value = "text" : passwordField.value = "password";
        }

        async function handleLogin() {
            const payload = {
                email: email.value,
                password: password.value
            };
			await loginUserFn(payload);

            if ( LoginUserStatusError.value ) {
                return
            }

            if ( LoginUserStatusSuccess.value ) {
                const { access_token, expires, refresh_token } = data.value.data.data;
                setCookiesAuthetication(access_token, expires, refresh_token);
                router.push({
                    name: "Home"
                });
            }
        }

        return {
            data,
            handleLogin,
            LoginUserStatusSuccess,
            LoginUserStatusError,
            LoginUserStatusIdle,
            LoginUserStatusPending,
            email,
            password,
            passwordField,
            handleRevealPassword,
            showProperPasswordIcon
        }
    },

	// methods: {
	// 	async login() {
	// 		this.loginStatus = apiStatus.Pending

	// 		const payload = {
	// 			email: this.username,
	// 			password: this.password,
	// 		};

	// 		const { response, error } = await withAsync(loginUser, payload);

	// 		if (error) {
	// 			this.loginStatus = apiStatus.Error
	// 			return
	// 		}
	// 		this.loginStatus = apiStatus.Success;
    //         this.$store.dispatch("auth/setUser", response.user.uid);
            
    //         if ( response.additionalUserInfo.isNewUser ) {
    //             return this.$router.push({ name: "Onboarding", query: { email: response.user.email }});
    //         }
    //         return this.$router.push({ name: "Welcome" });
            
	// 	},
	// }
}
</script>

<style lang="scss" scoped>

</style>