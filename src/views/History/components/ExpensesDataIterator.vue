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
                <slot name="filters"></slot>
            </v-toolbar>
            <div class="expense expense-border px-2">
                <div class="expense__transaction">
                    <p class="font-weight-bold">
                        {{ $t( `History.transaction` ) }}
                    </p>
                </div>
                <div class="expense__date">
                    <p class="font-weight-bold">
                        {{ $t( `History.date` ) }}
                    </p>
                </div>
                <div class="expense__amount">
                    <p class="font-weight-bold">
                        {{ $t( `History.amount` ) }}
                    </p>
                </div>
            </div>
        </template>

        <!-- Main body -->
        <template #default="props">
            <v-responsive
                height="290px"
                class="overflow-y-auto"
            >
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
                                    {{ item.date | ShortMonthDay }}
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
            </v-responsive>
        </template>

        <!-- No data -->
        <template #no-data>
            <v-container>
                <div class="pa-2 d-flex flex-column">
                    <p class="text-center">
                        <img src="@/assets/icons/statistics.png" class="icon">
                    </p>
                    <p class="primary--text text-sm text-center">
                        {{ $t( `History.noTransanctions` )}}
                        
                    </p>
                    <v-btn 
                        color="secondary"
                        depressed
                        small
                        class="primary--text mt-4"
                        :to="{ name: 'NewExpense'}"
                    >
                        {{ $t( `Homepage.createNewExpense` ) }}
                    </v-btn>
                </div>
            </v-container>
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
        },
        search: {
            type:       String,
            required:   true
        }
    },

    data() {
        return {
            page:           1,
            itemsPerPage:   999999,
            sortBy:         "date"
        }
    },

    computed: {
        numberOfPages () {
            return Math.ceil(this.items.length / this.itemsPerPage)
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