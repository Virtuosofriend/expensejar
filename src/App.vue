<template>
    <v-app>
        <section>
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
import { RouterView } from "vue-router";
import TheNavbar from "@/layout/TheNavbar.vue";
import BottomNavigation from "@/layout/BottomNavigation.vue";
</script>


<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100;300;400;500;600;700&display=swap");
@import url("./assets/css/main.css");
</style>
