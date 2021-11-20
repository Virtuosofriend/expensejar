<template>
    <div class="expenses">
        <p class="d-block expenses__amount mb-0">
            {{ sum }} €
            <span class="text-xs op6" v-if="total != 0">
                {{ percentageOfHome }}%
            </span>
        </p>
        <h4>
            <show-user-name-by-id
                tag="span"
                :userId="userId"
            ></show-user-name-by-id>
        </h4>
        
    </div>
</template>

<script>
import ShowUserNameById from "@/components/General/ShowUserNameById.vue";

export default {
    name: "TotalExpenseCard",

    props: {
        userId: {
            type:   String
        },
        sum: {
            required: true
        },
        total :{
            required:   true
        }
    },

    computed: {
        percentageOfHome() {
            return +(+this.sum / +this.total * 100).toFixed(1);
        }
    },

    components: {
        ShowUserNameById
    }
}
</script>

<style lang="scss" scoped>
.expenses h4 {
    text-align: center;
    opacity: .6;
}
.expenses__amount {
    font-size: 24px;
    opacity: 1;
    color: var(--v-primary-base);
    text-align: center;
    font-weight: 600;
}
</style>