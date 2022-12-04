<template>
    <v-app>
        <section v-if="showNavBar">
            <the-navbar class="app__header"></the-navbar>
        </section>
        <router-view></router-view>

        <div 
            class="navigation__ shadow" 
        >
            <bottom-navigation class="navigation__wrapper"></bottom-navigation>
        </div>
    </v-app>
  </template>

<script setup>
import { RouterView, useRoute } from "vue-router";
import TheNavbar from "@/layout/TheNavbar.vue";
import BottomNavigation from "@/layout/BottomNavigation.vue";
import { computed } from "vue";

const route = useRoute();

const showNavBar = computed(() => route.meta.hasNavbar);
</script>


<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100;300;400;500;600;700&display=swap");
@import url("./assets/css/main.css");
</style>
