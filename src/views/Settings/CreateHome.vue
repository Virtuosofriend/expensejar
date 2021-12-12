<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-btn
                    text
                    color="primary"
                    @click="handleBackButton()"
                >
                    <v-icon small class="mr-2">
                        fas fa-caret-left
                    </v-icon>
                    {{ $t( `General.back` ) }}
                </v-btn>
            </v-col>

            <v-col cols="12">
                <h2 class="text-center">
                    {{ $t( `Settings.CreateHome.createHomeTitle` ) }}
                </h2>
            </v-col>

            <v-col cols="12">
                <v-form 
                    ref="expenseForm"
                    class="pa-1"
                >
                    <v-container fluid>
                        <v-row>
                            <v-col
                                cols="12"
                            >
                                <!-- <label class="mb-2 d-block">
                                    {{ $t( `Settings.CreateHome.nameOfHome` ) }}
                                </label> -->
                                <v-text-field
                                    v-model="label"
                                    color="secondary"
                                    :label="`${ $t('Settings.CreateHome.label') }`"
                                    hide-details
                                    solo
                                    dark
                                    background-color="primary"
                                    flat
                                ></v-text-field>
                            </v-col>
                            <v-col
                                cols="12"
                            >
                                <v-btn
                                    depressed
                                    color="primary"
                                    block
                                    :loading="formStatus_Pending"
                                    :disabled="label === null"
                                    @click="addNewHome()"
                                >
                                    {{ $t( `Settings.CreateHome.letsGo` ) }}
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-form>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapState } from "vuex";
import { withAsync } from "@/helpers/withAsync"
import { apiStatus } from "@/api/constants/apiStatus"
import { apiStatusComputed } from "@/api/helpers/computedApiStatus"
import { createNewHome } from "@/api/homesApi.js"

export default {
    name: "CreateHomeSetting",

    data() {
        return {
            label: null
        }
    },

    computed: {
		...apiStatusComputed("formStatus"),
        ...mapState({
            user: state => state.auth.userId
        })
	},

    methods: {
        async addNewHome() {
            this.formStatus = apiStatus.Pending
			const { response, error } = await withAsync(createNewHome, {
                label: this.label,
                extraUser_id: null,
                userId: this.user
            });

			if (error) {
				this.formStatus = apiStatus.Error
				return
			}

            setTimeout(() => {
                this.formStatus = apiStatus.Success;
                this.handleBackButton();
            }, 1000);
        },

        handleBackButton() {
            this.$router.go(-1);
        }
    }

}
</script>