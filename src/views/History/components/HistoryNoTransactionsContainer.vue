<template>
    <base-no-content>
        <p v-if="isFilterEnabled">
            {{ $t(`History.filteredNoTransactions`) }}
        </p>
        <p v-else>
            {{ $t(`History.noTransanctions`) }}
        </p>
    </base-no-content>
</template>
<script>
import { computed } from "vue";
export default {
    name: "HistoryNoTransactionsContainer",

    props: {
        isSearch: {
            type: [String, null],
            default: null
        },
        isCategoryFilter: {
            type: [Number, null],
            default: null
        },
        isUserFilter: {
            type: [Number, null],
            default: null
        },
    },

    setup(props) {
        const isFilterEnabled = computed(() => {
            if ( props.isCategoryFilter || props.isUserFilter || props.isSearch ) {
                return true;
            }
            return false;
        });

        return {
            isFilterEnabled
        }
    }
}
</script>