<template>
	<v-app>
        <router-view />

        <div class="mt-4" v-show="showMenu">
            Testing
        </div>
    </v-app>
</template>

<script>
export default {
	name: "App",

    computed: {
        showMenu() {
            return this.$route.meta.hasMenu;
        }
    }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;300;400;600;700;800&display=swap');
@import url("./styles/common.scss");
@import url("./styles/components.scss");
</style>