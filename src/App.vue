<template>
	<v-app>
        <section v-show="showNavBar">
            <header-nav-bar></header-nav-bar>
        </section>
        <router-view />

        <div class="navigation__ shadow" v-show="showMenu">
            <bottom-navigation-menu class="navigation__wrapper"></bottom-navigation-menu>
        </div>
    </v-app>
</template>

<script>
export default {
	name: "App",

    computed: {
        showMenu() {
            return this.$route.meta.hasMenu;
        },

        showNavBar() {
            return this.$route.meta.hasNavbar;
        }
    },

    components: {
        BottomNavigationMenu: () => import("./layout/BottomNavigationMenu"),
        HeaderNavBar: () => import("./layout/HeaderBarAvatarDropdown.vue")
    },

    created() {
        console.info(`ExpenseJAR v${ process.env.VUE_APP_VERSION }`)
    }
}
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100;300;400;600;700;800&display=swap");
@import url("./styles/common.scss");
@import url("./styles/components.scss");

.navigation__ {
    position: fixed;
    bottom: 0;
    width: 100%;
    background-color: #3154ac;
    padding: 10px;
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
}
.navigation__wrapper {
    position: relative;
    width: 100vw;
    border-radius: 26px;
    background-color: var(--v-primary-base);
}
</style>