<template>
    <div>
        <slot 
            :tooltipStatus="tooltipStatus"
            :setTooltipStatus="setTooltipStatus"
        ></slot>

        <v-dialog
            v-model="tooltipStatus"
            width="500"
        >
            <v-card>
                <v-card-title class="text-h5 primary white--text">
                    <v-icon 
                        color="white" 
                        class="mr-2"
                        small
                    >
                        fas fa-shopping-bag
                    </v-icon>
                    {{ expenseItem.category }}
                </v-card-title>

                <v-card-text class="pa-6">
                    <h3>
                        {{ expenseItem.comment }}
                        <small class="d-block op7 font-weight-medium">
                            {{ $t( `History.addedBy` ) }}
                            <show-user-name 
                                :user-id="expenseItem.userId"
                                tag="span"
                            ></show-user-name>
                        </small>
                    </h3>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                    <small class="primary--text op6">
                        {{ expenseItem.date | ShortMonthDay }}
                    </small>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="primary"
                        text
                        @click="tooltipStatus = false"
                    >
                        {{ $t( `General.close` ) }}
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>   
    </div>
</template>

<script>
import ShowUserName from "@/components/General/ShowUserNameById.vue";

export default {
    name: "ClickableExpenseItem",

    props: {
        expenseItem: { required: true}
    },

    components: {
        ShowUserName
    },

    data() {
        return {
            tooltipStatus: false
        }
    },

    methods: {
        setTooltipStatus(status) {
            this.tooltipStatus = status;
        }
    }
}
</script>