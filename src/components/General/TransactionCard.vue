<template>
    <div class="transactionCard">
        <show-category 
            :category-id="transactionItem.category_id"
        >
            <template #default="{ category }">
                <v-row no-gutters>
                    <v-col cols="12">
                        <div class="d-flex align-center justify-space-between">
                            <p class="text-xs op6 mb-4">
                                {{ expenseDate }}
                            </p>
                            <slot name="avatar"></slot>
                        </div>
                    </v-col>
                    <v-col cols="12">
                        <div class="d-flex align-center">
                            <div class="category__icon">
                                <category-svg-image
                                    :category="category.value"
                                ></category-svg-image>
                            </div>
                            <div class="w-50">
                                <p class="text-sm">
                                    {{ transactionItem.comment }}
                                </p>
                            </div>
                            <div class="ml-auto price__tag">
                                <p class="text-lg font-weight-bold">
                                    {{ transactionItem.amount }} €
                                </p>
                            </div>
                        </div>
                    </v-col>
                </v-row>
            </template>
        </show-category>
    </div>
</template>

<script>
import { inject } from "vue";

import ShowCategory from "@/components/Expenses/ShowCategory.vue";
import CategorySvgImage from "./CategorySvgImage.vue";

export default {
    name: "LastTransactions",

    components: {
        CategorySvgImage,
        ShowCategory,
    },

    props: {
        transactionItem: {
            type:       Object,
            required:   true
        }
    },

    setup(props) {
        const $date = inject("date");
        const expenseDate = $date(props.transactionItem.expense_date).format("dddd, DD MMM");

        return {
            expenseDate
        }
    }
}
</script>

<style lang="scss" scoped>
.transactionCard {
    background-color: rgb(var(--v-theme-primary));
    border-radius: 16px;
    margin: 12px auto;
    padding: 16px;
    color: rgb(var(--v-theme-surface));
    width: 100%;
}
.op6 {
    opacity: .6;
}

.category__icon {
    width: 40px;
    height: 40px;
    margin: 6px 18px 6px 0;
    background: rgba(var(--v-theme-surface), 0.9);
    border-radius: 50%;

    img {
        width: 100%;
        padding: 8px;
    }
}

.price__tag {
    width: 74px;
    text-align: right;
}
</style>