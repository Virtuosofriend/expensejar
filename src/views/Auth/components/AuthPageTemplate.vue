<template>
    <section>
        <div class="authForm shadow">
            <base-logo></base-logo>
            <div class="authForm__content">
                <slot name="formContent"></slot>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: "AuthPageTemplate"
}
</script>

<style lang="scss" scoped>
section {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

.authForm {
    max-width: 550px;
    background-color: var(--v-background-base);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border-radius: 6px;
    margin-left: 24px;
    margin-bottom: 24px;
    padding: 36px;
}

.authForm__content {
    margin: 24px 0;
}

@media screen and (max-width: 480px) {
    .authForm {
        width: 100vw;
        margin-left: auto;
        margin-right: auto;
        padding: 18px;
        height: 100vh;
        margin-bottom: 0;
    }
}
</style>