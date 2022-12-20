<template>
    <v-app>
        <section v-if="showNavBar">
            <the-navbar></the-navbar>
        </section>
        <router-view></router-view>
        <section class="navigation">
            <bottom-navigation></bottom-navigation>
        </section>
    </v-app>
  </template>

<script setup>
import { RouterView, useRoute } from "vue-router";
import TheNavbar from "@/layout/TheNavbar.vue";
import BottomNavigation from "@/layout/BottomNavigation.vue";
import { computed, onMounted } from "vue";

import { getExpenseCategories } from "@/helpers/fetchGeneralCollections";
import { useGeneralStore } from "@/stores/GeneralStore";

const route = useRoute();

const showNavBar = computed(() => route.meta.hasNavbar);

/** Importing general settings for the application */
const GeneralStore = useGeneralStore();

onMounted( async () => {
    const categories = await getExpenseCategories();
    GeneralStore.setExpenseCategories(categories);
})

</script>


<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100;300;400;500;600;700&display=swap");
@import url("./styles/common.scss");
@import url("./styles/components.scss");

</style>
