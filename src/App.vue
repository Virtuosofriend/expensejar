<template>
    <v-app>
        <section v-if="showNavBar">
            <the-navbar></the-navbar>
        </section>
        <router-view id="scroll-target"></router-view>
        <section 
            v-show="hasMenu && menuIsScrolled" 
            v-scroll="onScroll"
            class="navigation"
        >
            <v-fade-transition>
                <bottom-navigation></bottom-navigation>
            </v-fade-transition>
        </section>
    </v-app>
  </template>

<script setup>
import { RouterView, useRoute } from "vue-router";
import TheNavbar from "@/layout/TheNavbar.vue";
import BottomNavigation from "@/layout/BottomNavigation.vue";
import { ref, computed, onMounted } from "vue";

import { getExpenseCategories } from "@/helpers/fetchGeneralCollections";
import { useGeneralStore } from "@/stores/GeneralStore";

const route = useRoute();

const showNavBar = computed(() => route.meta.hasNavbar);
const hasMenu = computed(() => route.meta.hasMenu);
const menuIsScrolled = ref(true);

/** Importing general settings for the application */
const GeneralStore = useGeneralStore();

onMounted( async () => {
    const categories = await getExpenseCategories();
    GeneralStore.setExpenseCategories(categories);
});

const onScroll = calculatePosition();

function calculatePosition() {
    let position = 0;

    function calculate() {
        const maxHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPosition = ((window.pageYOffset * 100) / maxHeight);

        if ( position != 0 && position > scrollPosition ) {
            position = scrollPosition;
            return menuIsScrolled.value = true;
        }

        if ( scrollPosition > 10 ) {
            menuIsScrolled.value = false;
        } else {
            menuIsScrolled.value = true;
        }
        return position = scrollPosition;
    }

    return calculate;
}
</script>


<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100;300;400;500;600;700&display=swap");
@import url("./styles/common.scss");
@import url("./styles/components.scss");
</style>
