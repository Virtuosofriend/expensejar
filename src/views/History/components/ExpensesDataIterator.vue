<template>
    <v-data-iterator
      :items="items"
      :items-per-page.sync="itemsPerPage"
      :page.sync="page"
      :search="search"
      :sort-by="sortBy"
      :sort-desc="true"
      hide-default-footer
    >
        <!-- Header -->
        <template #header>
            <v-toolbar
                dark
                elevation="0"
                color="transparent"
                class="mb-2"
            >
                <v-text-field
                    v-model="search"
                    dense
                    clearable
                    flat
                    background-color="primary"
                    solo-inverted
                    hide-details
                    label="Search"
                >
                    <template #prepend-inner>
                        <v-icon small>fas fa-search</v-icon>
                    </template>
                </v-text-field>
                <v-spacer></v-spacer>
                <v-select
                    class="ml-2"
                    flat
                    solo-inverted
                    hide-details
                    dense
                    background-color="primary"
                    :items="categoriesTransactions"
                    label="Type of transaction"
                >
                    <template #label>
                        <p class="text-xs mb-0 white--text op7 w-50 text-truncate">
                            Type of transaction
                        </p>
                    </template>
                </v-select>
            </v-toolbar>
            <div class="expense expense-border px-2">
                <div class="expense__transaction">
                    <p class="font-weight-bold">
                        Transaction
                    </p>
                </div>
                <div class="expense__date">
                    <p class="font-weight-bold">
                        Date
                    </p>
                </div>
                <div class="expense__amount">
                    <p class="font-weight-bold">
                        Amount
                    </p>
                </div>
            </div>
        </template>

        <!-- Main body -->
        <template #default="props">
            <v-row no-gutters>
                <v-col
                    v-for="item in props.items"
                    :key="item.id"
                    cols="12"
                >
                    <div class="expense px-2">
                        <div class="expense__transaction">
                            <p class="text-truncate">
                                {{ item.comment }}
                                <span>
                                    {{ item.category }}
                                </span>
                            </p>
                        </div>
                        <div class="expense__date">
                            <p>
                                {{ item.date }}
                            </p>
                        </div>
                        <div class="expense__amount">
                            <p class="font-weight-bold">
                                {{ item.amount }}€
                            </p>
                        </div>
                    </div>
                </v-col>
            </v-row>
        </template>

        <!-- Footer magic -->
        <template #footer>
            <v-row
                class="my-4 pb-4"
            >
                <v-col cols="4">
                    <p
                        class="mr-4 text-xs secondary--text text-center"
                    >
                        Page {{ page }} of {{ numberOfPages }}
                    </p>
                </v-col>
                <v-col
                    cols="8"
                >
                    <div class="d-flex justify-end pr-4">
                        <v-btn
                            depressed
                            x-small
                            dark
                            icon
                            color="secondary"
                            class="mr-1"
                            @click="page -= 1"
                        >
                            <v-icon x-small>
                                fas fa-chevron-left
                            </v-icon>
                        </v-btn>
                        <v-btn
                            x-small
                            icon
                            depressed
                            dark
                            color="secondary"
                            class="ml-1"
                            @click="page += 1"
                        >
                            <v-icon x-small>
                                fas fa-chevron-right
                            </v-icon>
                        </v-btn>
                    </div>
                </v-col>
            </v-row>
        </template>
    </v-data-iterator>
</template>

<script>
export default {
    name: "Expenses__FullList",

    props: {
        items: {
            type:       Array,
            required:   true
        }
    },

    computed: {
        numberOfPages () {
            return Math.ceil(this.items.length / this.itemsPerPage)
      }
    },

    data() {
        return {
            page:           1,
            itemsPerPage:   4,
            search:         "",
            sortBy:         "date",
            categoriesTransactions: [ "Supermaket", "Food", "Going out"]
        }
    }
}
</script>

<style lang="scss" scoped>
.expense {
    display: flex;
    align-items: center;
    margin: 6px auto;
    justify-content: space-between;

    div {
        margin: 0 12px;
        color: var(--v-primary-base);
        width: 100%;
    }

    .expense__transaction p,
    .expense__comment p {
        width: 150px;

        span {
            display: block;
            opacity: .4;
            font-size: 12px;
        }
    }

    .expense__amount {
        margin-left: auto;
    }

    &.expense-border {
        border-bottom: 2px solid #f6f9ff;
        border-radius: 0 !important;

        p {
            font-size: 14px;
        }
    }
}


.expense p {
    font-size: 13px;
    margin-bottom: 0;
    line-height: 1.8;
}
</style>