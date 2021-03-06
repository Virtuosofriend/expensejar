<template>
    <v-container class="mb-4">
        <v-row no-gutters>
            <v-col cols="12">
                <div class="d-flex align-center">
                    <div class="avatar">
                        <img :src="require('@/assets/images/logo_full.png')">
                    </div>
                    <div class="ml-4 greeting">
                        <h3 class="greeting__title">
                            {{ today }}
                            <show-user-name-by-id 
                                v-if="userId"
                                class="d-block"
                                tag="span"
                                :user-id="userId"
                            ></show-user-name-by-id>
                        </h3>
                    </div>
                    <homes-list-fetch>
                        <div slot-scope="{ homes, loading }" class="ml-auto dropdownHomes">
                            <v-select
                                v-model="selectedHome"
                                :items="homes"
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
    name: "HeaderBarAvatarDropdown",

    components: {
        HomesListFetch,
        ShowUserNameById
    },

    data() {
        return {
            selectedHome: null,
            today: this.$date().format("ddd, DD MMM YYYY")
        }
    },

    computed: {
        ...mapState({
            userId: state => state.auth.userId,
            homeId: state => state.auth.homeId
        })
    },

    methods: {
        handleHomeSelection() {
            this.$store.dispatch("auth/setHome", this.selectedHome);
        }
    },

    watch: {
        homeId: {
            immediate: true,
            handler: function( newVal ) {
                this.selectedHome = newVal;
            }
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