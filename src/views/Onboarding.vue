<template>
  <section class="primary h-100">
        <div class="white pa-4 d-flex justify-center">
            <base-logo></base-logo>
        </div>

        <div class="mt-10 d-flex flex-column mx-auto pa-4 welcomePanel">
            <div>
                <p class="text-center welcomePanel__title">
                    {{ $t( `Onboarding.onboardingTitle` ) }}
                </p>
            </div>
            <div class="mt-10 text-center">
                <v-text-field
                    v-model="name"
                    :label="`${ $t('Onboarding.textInputName') }`"
                    flat
                    full-width
                    color="secondary"
                    solo
                    hide-details
                ></v-text-field>
            </div>

            <div class="mt-10 d-flex justify-end">
                <v-btn
                    depressed
                    color="secondary"
                    class="font-weight-bold primary--text"
                    :disabled="name == ''"
                    @click="handleSaveProfile()"
                >
                    {{ $t( `Onboarding.createProfileBtn` ) }}
                </v-btn>
            </div>
        </div>
    </section>
</template>

<script>
import { withAsync } from "@/helpers/withAsync";
import { setUser } from "@/api/authApi.js";
import { mapState } from "vuex";

export default {
    name: "OnboardingView",

    data() {
		return {
            name: ""
		}
	},

	computed: {
        ...mapState({
            userId: state => state.auth.userId
        })
	},

    methods: {
        async handleSaveProfile() {
            let { email } = this.$route.query;     
            const payload = {
                user_id: this.userId,
                name: this.name,
                email
            };
            const { response, error } = await withAsync(setUser, payload);

            if ( error ) {
                return;
            }

            return this.$router.push({ name: "Welcome" });
        }
    }
}
</script>

<style lang="scss" scoped>
.welcomePanel {
    height: calc(100% - 260px);
}
.welcomePanel__title {
    color: var(--v-secondary-base);
    font-size: 20px; 
}

.welcomePanel__secondary {
    color: var(--v-secondary-base);
    font-weight: 300;
}
</style>