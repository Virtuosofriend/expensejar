<template>
    <v-table>
        <thead>
            <tr>
                <th class="text-left">
                    Transanction
                </th>
                <th class="text-left">
                    Date
                </th>
                <th class="text-left">
                    Amount
                </th>
            </tr>
        </thead>
        <tbody>
            <tr
                v-for="item in transactions"
                :key="item.name"
            >
                <td>
                    {{ item.comment }} <br>
                    <show-category 
                        :category-id="item.category_id"
                    >
                        <template #default="{ category }">
                            {{ category }}
                        </template>
                    </show-category>
                </td>
                <td>
                    {{ item.expense_date }}
                </td>
                <td>
                    {{ item.amount }}
                </td>
            </tr>
        </tbody>
    </v-table>
  </template>

<script>
import ShowCategory from "@/components/Expenses/ShowCategory.vue";

import { ref } from "vue";

export default {
    name: "TransanctionsTable",

    components: {
        ShowCategory
    },

    props: {
        transactions: {
            type:     Array,
            required: true,
        }
    },

    setup() {

      return {
      }
    }
}
</script>