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
                    flat
                    label=""
                    solo
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
                >
                    Continue
                </v-btn>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: "Welcome__screen",

    data() {
        return {
            homes: ["Thessaloniki home", "Dimitris personal", "Lamia home"],
            selectedHome: "Thessaloniki home"
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