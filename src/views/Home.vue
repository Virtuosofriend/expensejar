<template>
    <v-container>
        <!-- Header -->
        <section>
            <v-row no-gutters>
                <v-col cols="12">
                    <div class="d-flex align-center">
                        <div class="avatar">
                            <img :src="require('@/assets/images/user.png')">
                        </div>
                        <div class="ml-4 greeting">
                            <h3 class="greeting__title">
                                Welcome back
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
                                    <v-icon 
                                        color="primary"
                                        small
                                    >
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
        </section>

         <!-- Monthly statistics -->

        <section>
            <v-row no-gutters>
                <v-col cols="12">
                    <v-card
                        elevation="0"
                        rounded
                        color="primary"
                        dark
                        min-height="250"
                    >
                        <v-card-title>
                            October overview
                        </v-card-title>
                        <v-card-text class="text-h4 secondary--text">
                                <small class="text-overline d-block">spent</small>
                                650€ <small style="font-size:12px; display: inline-block; margin-left: 4px">62% of the total in the home</small>
                        </v-card-text>
                    </v-card>
                    <div class="position-relative d-flex justify-center month__newexpense">
                        <v-btn 
                            color="secondary"
                            block
                            class="primary--text shadow"
                            
                        >
                            Create new expense
                        </v-btn>
                    </div>
                </v-col>
            </v-row>
        </section>
    </v-container>
</template>

<script>
export default {
    name: "Home__view",
    
    data() {
        return {
            homes: ["Thessaloniki home", "Dimitris personal", "Lamia home"],
            selectedHome: "Thessaloniki home"
        }
    }
}
</script>

<style lang="scss" scoped>
section {
    margin-bottom: 36px;
}
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
        font-size: 26px;
        text-transform: initial;
        color: var(--v-primary-base);
    }
}

.dropdownHomes {
    width: 30%;
}

.month__newexpense {
    width: 50%;
    margin-left: auto;
    margin-right: auto;
    margin-top: -20px;
}
</style>