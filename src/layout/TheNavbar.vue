<template>
    <v-container>
        <v-row no-gutters>
            <v-col cols="12">
                <div class="d-flex align-center">
                    <div class="logo">
                        <img :src="`${url}assets/${ user.avatar }?key=system-small-cover&download=true`">
                    </div>
                    <div class="ml-4 ml-auto">
                        <v-btn
                            color="transparent"
                            icon="fa-solid fa-jar"
                            size="small"
                            :to="{ name: routeNames.HISTORY }"
                        ></v-btn>
                        <v-btn
                            color="transparent"
                            icon="fa-solid fa-chart-simple"
                            size="small"
                            :to="{ name: routeNames.COMPARE }"
                        ></v-btn>
                    </div>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { useUserStore } from "@/stores/UserStore";
import routeNames from "@/common/constants/routeNames";

export default {
    name: "HeaderBarAvatarDropdown",

    setup() {
        const userStore = useUserStore();
        const url = import.meta.env.VITE_APP_API_URL;

        return {
            user: userStore.profile,
            url,
            routeNames
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