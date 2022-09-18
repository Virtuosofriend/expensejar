<template>
    <div class="container">
        <the-navbar></the-navbar>
        <main>
            <router-view></router-view>
        </main>
    </div>
    <!-- <v-app>
        <section v-if="showNavBar">
            <header-nav-bar></header-nav-bar>
        </section>
        <router-view :key="homeId"></router-view>

        <div 
            v-show="showMenu"
            class="navigation__ shadow" 
        >
            <bottom-navigation-menu class="navigation__wrapper"></bottom-navigation-menu>
        </div>
    </v-app> -->
  </template>

<script setup>
import { RouterView } from "vue-router";
import TheNavbar from "@/layout/TheNavbar.vue";

</script>


<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100;300;400;500;600;700&display=swap");
@import url("./assets/css/main.css");
</style>
