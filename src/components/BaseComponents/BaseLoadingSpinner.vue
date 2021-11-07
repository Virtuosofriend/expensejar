<template>
    <div class="spinner mt-6">
        <v-progress-circular
            indeterminate
            size="38"
            width="2"
            color="primary"
        ></v-progress-circular>

        <p class="mt-6 mb-0 text-sm">
            {{ $t( `General.loading` ) }}...
        </p>
    </div>
</template>

<script>
export default {
    name: "BaseLoadingSpinner"
}
</script>

<style lang="scss" scoped>
.spinner {
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>