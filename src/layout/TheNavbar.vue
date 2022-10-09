<template>
    <header>
        <div class="grid">
            <div class="col">
                <div class="logo">
                    <img alt="ExpenseJAR logo" class="logo__image" src="@/assets/images/logo-sm.png" />
                    <h1 class="text-primary">
                        Expense<span>JAR</span>
                    </h1>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
export default {
    name: "TheNavbar",
}
</script>

<style scoped>
.logo {
    display: flex;
    align-items: center;
}

.logo h1 {
    font-weight: 600;
    font-size: 32px;
}

.logo__image {
    margin-right: 12px;
    width: 58px;
}
</style>