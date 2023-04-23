<template>
    <v-container>
        <v-row no-gutters>
            <v-col cols="12">
                <div class="d-flex align-center">
                    <members-of-jar-container
                        :jar-id="activeJar"
                    >
                        <div class="logo">
                            <img :src="`${url}assets/${ user.avatar }?key=system-small-cover&download=true`">
                        </div>
                    </members-of-jar-container>
                    <div class="ml-4 ml-auto">
                        <v-btn
                            color="transparent"
                            icon="fa-solid fa-jar"
                            size="small"
                            :selected-class="activeRoute === routeNames.HISTORY ? 'selected' : ''"
                            :to="{ name: routeNames.HISTORY, query: { month: currentMonth }}"
                        ></v-btn>
                        <v-btn
                            color="transparent"
                            icon="fa-solid fa-chart-simple"
                            size="small"
                            :to="{ name: routeNames.COMPARE, query: { month: currentMonth } }"
                        ></v-btn>
                    </div>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { useRoute } from "vue-router";
import { computed } from "vue";
import { useUserStore } from "@/stores/UserStore";
import routeNames from "@/common/constants/routeNames";
import { currentMonth } from "@/common/constants/routeQueries.js";

import MembersOfJarContainer from "@/components/General/containers/MembersOfJarContainer.vue";

export default {
    name: "HeaderBarAvatarDropdown",
    components: {
        MembersOfJarContainer
    },
    setup() {
        const userStore = useUserStore();
        const url = import.meta.env.VITE_APP_API_URL;

        const route = useRoute();
        const activeRoute = computed(() => route.name);
        return {
            user: userStore.profile,
            url,
            routeNames,
            currentMonth,
            activeRoute,
            activeJar: userStore.active_jar
        }
    }

}
</script>

<style lang="scss" scoped>
.logo {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    padding: 2px;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
        object-fit: cover;
        width: 36px;
        border-radius: 50%;
    }
}
</style>