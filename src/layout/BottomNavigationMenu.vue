<template>
    <v-bottom-navigation
        :value="optionSelected"
        color="secondary"
        grow
        elevation="0"
        background-color="primary"
        shift
        class="pt-3"
    >
        <v-btn
            depressed
            color="primary"
            text
            :to="{ name: 'Home' }"
        >
            <span class="primary--text secondary active">
                {{ $t( `Menu.home` ) }}
            </span>

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
            <span class="primary--text secondary active">
                {{ $t( `Menu.history` ) }}
            </span>

            <v-icon color="secondary">
                fas fa-history
            </v-icon>
        </v-btn>

        <v-btn
            depressed
            color="primary"
            text
            :to="{ name: 'Compare' }"
        >
            <span class="primary--text secondary active">
                {{ $t( `Menu.compare` ) }}
            </span>

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
            <span class="primary--text secondary active">
                {{ $t( `Menu.settings` ) }}
            </span>

            <v-icon color="secondary">
                fas fa-cog
            </v-icon>
        </v-btn>
    </v-bottom-navigation>
</template>

<script>
export default {
    name: "BottomNagivation",

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