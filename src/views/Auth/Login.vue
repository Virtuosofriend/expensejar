<template>
    <div>
        <button @click.prevent="login()">Login</button>
    </div>
</template>

<script>
import { withAsync } from "@/helpers/withAsync";
import { apiStatus } from "@/api/constants/apiStatus";
import { apiStatusComputed } from "@/api/helpers/computedApiStatus";
import { loginUser } from "@/api/authApi.js";

export default {
    name: "Login__page",

    data() {
        return {
            loginStatus: apiStatus.Idle
        }
    },

    computed: {
        ...apiStatusComputed("loginStatus")
    },

    methods: {
        async login() {
            this.loginStatus = apiStatus.Pending;

            const payload = {
                email: "dsakellariou@test.com", 
                password: "testpass"
            };

            const {response, error} = await withAsync(loginUser, payload);

            if ( error ) {
                this.loginStatus = apiStatus.Error;
                return;
            }
            console.log(response.user);
            // Add token to the api object
            this.loginStatus = apiStatus.Success;
        },
    }
}
</script>