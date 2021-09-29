<template>
    <section>
        <div class="authForm shadow">
            <div class="authForm__title">
                <img :src="require('@/assets/images/logo.png')" class="logo">
                <h1>
                    ExpenseJAR
                </h1>
            </div>
            <div class="authForm__content">
                <slot name="formContent"></slot>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: "AuthPage__template"
}
</script>

<style lang="scss" scoped>
section {
    height: 100%;
    width: 100%;
    background: url('../../../assets/images/background.jpg') no-repeat center center; 
    background-size: cover;
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
}

.authForm__content {
    margin: 0 24px;
}

.logo {
    width: 220px;
}
</style>