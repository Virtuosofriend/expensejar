<template>
    <v-btn
        id="v-btn--disabled-primary"
        color="primary"
        depressed
        small
        :disabled="disabled"
        :loading="resolvementStatus_Pending"
        @click="handleResolve()"
    >
        <slot></slot>
    </v-btn>
</template>

<script>
import { withAsync } from "@/helpers/withAsync";
import { apiStatus } from "@/api/constants/apiStatus";
import { apiStatusComputed } from "@/api/helpers/computedApiStatus";
import { createResolvement } from "@/api/resolvementsApi.js";

import { mapState } from "vuex";

export default {
    name: "ResolveMonthButton",

    props: {
        disabled: {
            required:   false,
            type:       Boolean,
            default:    false
        },
        month: {
            required:   true,
            type:       Number
        },
        year: {
            required:   true,
            type:       Number
        }
    },
    
    data() {
        return {
            resolvementStatus: apiStatus.Idle,
        }
    },

    computed: {
        ...apiStatusComputed("resolvementStatus"),
        ...mapState({
            home: state => state.auth.homeId,
        })
    },

    methods: {
        async handleResolve() {
            this.resolvementStatus = apiStatus.Pending;
            const payload = {
                month:  this.month,
                year:   this.year,
                homeId: this.home
            };

			const { response, error } = await withAsync(createResolvement, payload);

			if (error) {
				this.resolvementStatus = apiStatus.Error;
				return
			}
            
            setTimeout(() => {
                this.resolvementStatus = apiStatus.Success;
                this.$emit("resolvement-added");
            }, 1000);
        },
    },

    beforeDestroy() {
        this.$off("resolvement-added");
    }

}
</script>