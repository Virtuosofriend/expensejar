<template>
    <v-container class="mb-4">
        <v-row no-gutters>
            <v-col cols="12">
                <div class="d-flex align-center">
                    <div class="avatar">
                        <img :src="require('@/assets/images/user.png')">
                    </div>
                    <div class="ml-4 greeting">
                        <h3 class="greeting__title">
                            {{ today }}
                            <span class="d-block">Dimitris</span>
                        </h3>
                    </div>
                    <div class="ml-auto dropdownHomes">
                        <v-select 
                            :items="homes" 
                            v-model="selectedHome" 
                            flat 
                            dense 
                            rounded 
                            hide-details 
                            label=""
                            background-color="secondary" 
                            color="primary" 
                            append-icon="fas fa-caret-down" 
                            solo
                        >
                            <template #append>
                                <v-icon color="primary" small>
                                    fas fa-caret-down
                                </v-icon>
                            </template>

                            <template #selection="{ item }">
                                <p class="mb-0 text-xs text-truncate primary--text">
                                    {{ item }}
                                </p>
                            </template>
                        </v-select>
                    </div>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        name: "HeaderBar__avatarDropdown",

        data() {
            return {
                homes: ["Thessaloniki home", "Dimitris personal", "Lamia home"],
                selectedHome: "Thessaloniki home",
                today: this.$date().format("ddd, DD MMM YYYY")
            }
        },
    }
</script>

<style lang="scss" scoped>
.avatar {
    width: 52px;
    height: 52px;
    border-radius: 50%;
    padding: 2px;
    border: 2px solid var(--v-secondary-base);
    background: var(--v-secondary-base);
    display: flex;
    justify-content: center;
    align-items: center;

    img {
        object-fit: contain;
        border-radius: 50%;
        width: 100%;
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