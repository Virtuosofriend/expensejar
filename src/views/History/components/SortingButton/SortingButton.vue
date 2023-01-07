<template>
    <div :class="$style.button">
        <div class="w-25">
            <slot name="icon"></slot>
        </div>
        <div class="w-75">
            <slot name="title"></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: "SortingButton"
}
</script>

<style module lang="scss">
.button {
    width: 100%;
    height: 32px;
    cursor: pointer;
    display: flex;
    align-items: center;
}
</style>