<template>
    <v-card
        elevation="0"
        rounded="medium"
    >
        <v-img
          height="160"
          :src="backgroundImage"
          cover
          class="text-white"
        >
            <v-card-text>
                <p
                    class="font-weight-medium text-surface"
                >
                    My expenses this month
                </p>
            </v-card-text>
            <v-card-text class="mb-2 text-surface">
                <h4 class="font-weight-bold mb-6">
                    510.13<span class="text-2xl">€</span>
                </h4>
                <p class="text-xs">
                    See details
                </p>
            </v-card-text>
        </v-img>
      </v-card>
</template>

<script>
import { computed } from "vue";
export default {
    name: "CurrentMonthExpensesSummaryCard",
    setup() {
        const backgroundImage = computed(() => {
            return new URL(`@/assets/backgrounds/dots.svg`, import.meta.url).href;
        });

        return {
            backgroundImage
        }
    }
}
</script>