<template>
    <v-bottom-navigation
        :value="optionSelected"
        color="secondary"
        grow
        elevation="0"
        shift
        background-color="primary"
        class="pt-2"
    >
        <v-btn
            depressed
            color="primary"
            text
            :to="{ name: 'Home' }"
        >
            <span class="primary--text secondary active">Home</span>

            <v-icon color="secondary">
                fas fa-home
            </v-icon>
        </v-btn>

        <v-btn
            depressed
            color="primary"
            text
            :to="{ name: 'History' }"
        >
            <span class="primary--text secondary active">History</span>

            <v-icon color="secondary">
                fas fa-history
            </v-icon>
        </v-btn>

        <v-btn
            depressed
            color="primary"
            text
        >
            <span class="primary--text secondary active">Compare</span>

            <v-icon color="secondary">
                fas fa-not-equal
            </v-icon>
        </v-btn>

        <v-btn
            depressed
            color="primary"
            text
            :to="{ name: 'Settings' }"
        >
            <span class="primary--text secondary active">Settings</span>

            <v-icon color="secondary">
                fas fa-cog
            </v-icon>
        </v-btn>
    </v-bottom-navigation>
</template>

<script>
export default {
    name: "Bottom__nagivation",

    data() {
        return {
            optionSelected: 0,
        }
    }
}
</script>

<style lang="scss" scoped>
.active {
    border-radius: 6px;
    padding: 2px 6px;
}
</style>