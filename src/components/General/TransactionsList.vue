<template>
    <div class="transactionCard">
        <div class="transactionCard__item-fixedWidth">
            <show-category 
                :category-id="transactionItem.category_id"
            >
                <template #default="{ category }">
                    <p class="text-xs">
                        {{ category }}
                    </p>
                </template>
            </show-category>
</div>

        <div class="transactionCard__item">
            <p class="text-xs font-weight-bold">
                {{ transactionItem.amount }} €
            </p>
        </div>

        <div class="transactionCard__item">
            <p class="text-xs op6">
                {{ expenseDate }}
            </p>
        </div>
    </div>
</template>

<script>
import { inject } from "vue";

import ShowCategory from "@/components/Expenses/ShowCategory.vue";

export default {
    name: "LastTransactions",

    props: {
        transactionItem: {
            type:       Object,
            required:   true
        }
    },

    setup(props) {
        const $date = inject("date");
        const expenseDate = $date(props.transactionItem.expense_date).format("DD MMM");

        return {
            expenseDate
        }
    }
}
</script>

<style lang="scss" scoped>
.transactionCard {
    background-color: #fff;
    border-radius: 16px;
    margin: 12px auto;
    padding: 16px;
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    justify-content: space-between;
}

.transactionCard__item p,
.transactionCard__item-fixedWidth p {
    margin-bottom: 0;
}

.transactionCard__item-fixedWidth {
    width: 160px;
}

.op6 {
    opacity: .6;
}
</style>