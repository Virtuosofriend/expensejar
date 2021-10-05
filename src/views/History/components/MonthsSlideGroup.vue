<template>
    <v-sheet
        class="pa-4"
        max-width="700"
        color="transparent"
    >
        <v-slide-group
            hide-arrows
            active-class="primary"
        >
            <v-slide-item
                v-for="n in 25"
                :key="n"
                v-slot="{ active, toggle }"
            >
                <v-btn
                    class="mx-2"
                    :input-value="active"
                    depressed
                    :color="active ? undefined : 'secondary'"
                    @click="toggle"
                >
                    Options {{ n }}
                </v-btn>
            </v-slide-item>
        </v-slide-group>
    </v-sheet>
</template>

<script>
export default {
    name: "Months__slideGroup"
}
</script>

<style lang="scss" scoped>

</style>