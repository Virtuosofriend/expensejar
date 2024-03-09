<template>
	<div :class="$style.avatar">
		<img :src="`${url}assets/${ avatarUrl }?key=system-small-cover&download=true`">
	</div>
</template>

<script>
export default {
    name: "TransactionAvatar",

    props: {
        avatarUrl: {
            required: true,
            type: String
        }
    },

    setup() {
        const url = import.meta.env.VITE_APP_API_URL;

        return {
            url
        }
    }
}
</script>

<style module lang="scss">
.avatar {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    padding: 2px;

    img {
        height: 100%;
        width: 100%;
        border-radius: 50%;
    }
}
</style>