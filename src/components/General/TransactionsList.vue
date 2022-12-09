<template>
    <div class="transactionCard">
        <div class="transactionCard__item-fixedWidth">
            <p class="text-xs">
                {{ expenseCategory }}
            </p>
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
import { computed, inject } from "vue";
import { useGeneralStore } from "@/stores/GeneralStore";

export default {
    name: "LastTransactions",

    props: {
        transactionItem: {
            type:       Object,
            required:   true
        }
    },

    setup(props) {
        const generalStore = useGeneralStore();
        const $date = inject("date");

        const expenseCategory = computed(() => {
            if ( generalStore.expense_categories ) {
                return generalStore.expense_categories.find(category => category.id === props.transactionItem.category_id).label_en; 
            }
            return null;
        });

        const expenseDate = $date(props.transactionItem.expense_date).format("DD MMM");

        return {
            expenseCategory,
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