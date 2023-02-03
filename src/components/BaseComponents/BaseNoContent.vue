<template>
    <div class="d-flex flex-column justify-center align-center" style="height: 40vh">
        <div class="w-100 mt-4">
            <img src="@/assets/icons/nodata.svg">
        </div>
        <div class="mt-4 mb-4 w-75 text-center">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: "BaseNoContent"
}
</script>

<style scoped>
img {
    object-fit: contain;
    height: 164px;
    width: 100%;
    opacity: .7;
}
</style>