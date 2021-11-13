<template>
    <v-container class="mb-4">
        <v-row no-gutters>
            <v-col cols="12">
                <div class="d-flex align-center">
                    <div class="avatar">
                        <img :src="require('@/assets/images/logo-sm.png')">
                    </div>
                    <div class="ml-4 greeting">
                        <h3 class="greeting__title">
                            {{ today }}
                            <show-user-name-by-id 
                                class="d-block"
                                tag="span"
                                :userId="userId"
                                v-if="userId"
                            ></show-user-name-by-id>
                        </h3>
                    </div>
                    <homes-list-fetch>
                        <div class="ml-auto dropdownHomes" slot-scope="{ homes, loading }">
                            <v-select
                                v-if="homes.length > 0"
                                :items="homes"
                                v-model="selectedHome"
                                item-text="label"
                                item-value="value"
                                flat
                                dense 
                                rounded 
                                hide-details 
                                label=""
                                background-color="secondary" 
                                color="primary" 
                                append-icon="fas fa-caret-down" 
                                solo
                                :loading="!loading"
                                @input="handleHomeSelection()"
                            >
                                <template #append>
                                    <v-icon color="primary" small>
                                        fas fa-caret-down
                                    </v-icon>
                                </template>

                                <template #selection="{ item }">
                                    <p class="mb-0 text-xs text-truncate primary--text">
                                        {{ item.label }}
                                    </p>
                                </template>
                            </v-select>
                        </div>
                    </homes-list-fetch>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import HomesListFetch from "@/components/General/HomesListFetch";
import ShowUserNameById from "@/components/General/ShowUserNameById.vue";
import { mapState } from "vuex";

export default {
    name: "HeaderBar__avatarDropdown",

    data() {
        return {
            selectedHome: this.$store.state.auth.homeId,
            today: this.$date().format("ddd, DD MMM YYYY")
        }
    },

    computed: {
        ...mapState({
            userId: state => state.auth.userId,
        })
    },

    methods: {
        handleHomeSelection() {
            this.$store.dispatch("auth/setHome", this.selectedHome);
        }
    },

    components: {
        HomesListFetch,
        ShowUserNameById
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
        color: var(--v-secondary-base);
        font-size: 14px;
        text-transform: lowercase;
    }

    span {
        display: block;
        font-size: 18px;
        text-transform: initial;
        color: var(--v-primary-base);
    }
}

.dropdownHomes {
    width: 30%;
}
</style>