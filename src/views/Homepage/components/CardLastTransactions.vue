<template>
    <div class="transactionCard">
        <div class="transactionCard__item-fixedWidth">
            <p class="text-xs">
                {{ transactionItem.transaction }}
            </p>
        </div>

        <div class="transactionCard__item">
            <p class="text-xs font-weight-bold">
                {{ transactionItem.amount }} €
            </p>
        </div>

        <div class="transactionCard__item">
            <p class="text-xs op6">
                {{ transactionItem.date }}
            </p>
        </div>
    </div>
</template>

<script>
export default {
    name: "Last__transactions",

    props: {
        transactionItem: {
            type:       Object,
            required:   true
        }
    },

    data () {
        return {
           
        }
    },
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