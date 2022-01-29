<template>
    <section class="primary h-100">
        <div class="white pa-4 d-flex justify-center">
            <base-logo></base-logo>
        </div>

        <div class="mt-10 d-flex flex-column mx-auto pa-4 welcomePanel">
            <div>
                <p class="text-center welcomePanel__title">
                    {{ $t(`Welcome.chooseYourHome`) }}
                </p>
            </div>
            <homes-list-fetch>
                <div slot-scope="{ homes, loading }" class="mt-4 mb-10">
                    <v-select
                        v-model="selectedHome"
                        :items="homes"
                        item-text="label"
                        item-value="value"
                        flat
                        :label="`${$t('Welcome.selectHome')}`"
                        :loading="!loading"
                        solo
                    ></v-select>
                </div>
            </homes-list-fetch>

            <div class="mt-10 text-center">
                <p class="welcomePanel__secondary">
                    {{ $t(`Welcome.noHomeText`) }}
                </p>
                <v-btn
                    text
                    color="secondary"
                    class="font-weight-bold"
                    :to="{ name: 'CreateHome' }"
                >
                    {{ $t(`Welcome.createNewHome`) }}
                </v-btn>
            </div>

            <div class="mt-auto d-flex justify-end">
                <v-btn
                    :disabled="selectedHome == null"
                    depressed
                    color="secondary"
                    class="font-weight-bold primary--text"
                    @click="handleContinue()"
                >
                    {{ $t(`General.continue`) }}
                </v-btn>
            </div>
        </div>
    </section>
</template>

<script>
import { mapState } from "vuex";
import HomesListFetch from "@/components/General/HomesListFetch";

export default {
    name: "WelcomeScreen",

    components: {
        HomesListFetch,
    },

    data() {
        return {
            selectedHome: null,
        };
    },

    computed: {
        ...mapState({
            storedHome: (state) => state.auth.homeId,
        }),
    },

    methods: {
        handleContinue() {
            this.$store.dispatch("auth/setHome", this.selectedHome).then(() => {
                this.$router.push({ name: "Home" });
            });
        },

        handleHomeSelection() {
            console.log(this.selectedHome);
        },
    },
};
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
