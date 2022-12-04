<template>
    <v-container class="mb-4">
        <v-row no-gutters>
            <v-col cols="12">
                <div class="d-flex align-center">
                    <div class="avatar">
                        <img src="@/assets/images/logo_full.png">
                    </div>
                    <div class="ml-4 greeting">
                        <h3 class="greeting__title">
                            {{ today }}
                            <span class="d-block">
                                Welcome back, {{ user.first_name }}
                            </span>
                        </h3>
                    </div>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { inject } from "vue";
import { useUserStore } from "@/stores/UserStore";

export default {
    name: "HeaderBarAvatarDropdown",

    setup() {
        // Store declaration
        const userStore = useUserStore();

        // View variables
        const date = inject("date");
        const today = date().format("ddd, DD MMM YYYY");

        // Returns

        return {
            today,
            user: userStore.profile
        }
    }

}
</script>

<style lang="scss" scoped>
.avatar {
    width: 52px;
    height: 52px;
    border-radius: 50%;
    padding: 2px;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
        object-fit: cover;
        width: 38px;
    }
}

.greeting {
    h3 {
        line-height: 1.2;
        color: rgb(var(--v-theme-secondary));
        font-size: 14px;
        text-transform: lowercase;
    }

    span {
        display: block;
        font-size: 18px;
        text-transform: initial;
        color: rgb(var(--v-theme-primary));
    }
}

.dropdownHomes {
    width: 30%;
}
</style>