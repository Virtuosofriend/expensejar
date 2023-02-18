<template>
    <img :src="iconUrl">
</template>
<script setup>
import {  computed } from "vue";
const props = defineProps({
    category: {
        type: String,
        required: true,
    },
});
const iconUrl = computed(() => {
    return new URL(`../../assets/icons/categories/${props.category}.svg`, import.meta.url).href;
});

</script>