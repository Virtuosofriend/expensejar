<template>
    <section class="primary h-100">
        <div class="white pa-4 d-flex justify-center">
            <base-logo></base-logo>
        </div>

        <div class="mt-10 d-flex flex-column mx-auto pa-4 welcomePanel">
            <div>
                <p class="text-center welcomePanel__title">
                    Choose your home
                </p>
            </div>
            <div class="mt-4 mb-10">

                <v-select
                    :items="homes"
                    v-model="selectedHome"
                    item-text="label"
                    item-value="value"
                    flat
                    label=""
                    :loading="homeStatus_Pending"
                    solo
                    @input="handleHomeSelection()"
                ></v-select>
            </div>

            <div class="mt-10 text-center">
                <p class="welcomePanel__secondary">
                   No home? You can create a new one 
                </p>
                <v-btn 
                    text
                    color="secondary"
                    class="font-weight-bold"
                >
                    Create new home
                </v-btn>
            </div>

            <div class="mt-auto d-flex justify-end">
                <v-btn
                    depressed
                    color="secondary"
                    class="font-weight-bold primary--text"
                    @click="handleContinue()"
                >
                    Continue
                </v-btn>
            </div>
        </div>
    </section>
</template>

<script>
import { withAsync } from "@/helpers/withAsync"
import { apiStatus } from "@/api/constants/apiStatus"
import { apiStatusComputed } from "@/api/helpers/computedApiStatus"
import { fetchHomes } from "@/api/homesApi.js"

export default {
    name: "Welcome__screen",

    data() {
        return {
            homes: [],
            selectedHome: "Thessaloniki home",
            homeStatus:    apiStatus.Idle
        }
    },

    computed: {
        ...apiStatusComputed("homeStatus")
    },

    methods: {
        handleContinue() {
            this.$router.push({ name: "Home" });
        },

        handleHomeSelection() {
            this.$store.dispatch("auth/setHome", this.selectedHome);
        },

        async fetchUserHomes() {
            this.homeStatus = apiStatus.Pending

			const payload = localStorage.getItem("expenseJar_uid");

			const { response, error } = await withAsync(fetchHomes, payload);

			if (error) {
				this.homeStatus = apiStatus.Error
				return
			}
			
            if ( response.docs.length > 0 ) {
                this.homes.splice(0);
                response.docs.forEach(elem => {
                    const elementData = elem.data();
                    const elementId = elem.id;
                    this.homes.push({
                        label: elementData.label,
                        value:  elementId
                    });
                });

                this.selectedHome = this.homes[0].value;
                this.handleHomeSelection();
            } else {
                this.homes = [];
            }

            this.homeStatus = apiStatus.Success;
            
        }
    },

    created() {
        this.fetchUserHomes();
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