<template>
    <div :class="$style.avatar">
        <img :src="`${url}assets/${ avatarUrl }?download=true`">
    </div>
</template>

<script>
export default {
    name:"JarMembersCardAvatar",
    props: {
        avatarUrl: {
            required: true,
            type: String
        },
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
    width: 44px;
    height: 44px;
    border-radius: 8px;

    img {
        height: 100%;
        width: 100%;
        border-radius: 8px;
        object-fit: cover;
    }
}
</style>