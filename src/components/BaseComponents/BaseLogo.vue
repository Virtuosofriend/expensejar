<template>
    <div class="logo">
        <img src="@/assets/images/logo_full.png" class="logo__image">
        <h1>
            Expense<span>JAR</span>
        </h1>
    </div>
</template>

<script>
export default {
    name: "BaseLogo"
}
</script>

<style lang="scss" scoped>
.logo {
    display: flex;
    align-items: center;
    margin: 24px auto;
}

.logo h1 {
    font-weight: 600;
    font-size: 32px;

    span {
        color: var(--v-accent-base);
    }
}

.logo__image {
    margin-right: 12px;
    width: 58px;
}
</style>