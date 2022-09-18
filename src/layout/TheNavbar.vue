<template>
    <header>
        <van-row>
            <van-col span="8">
                <div class="logo">
                    <img alt="ExpenseJAR logo" class="logo__image" src="@/assets/images/logo-sm.png" />
                    <h1>
                        Expense<span>JAR</span>
                    </h1>
                </div>
            </van-col>
            <van-col span="14">
                Other options
            </van-col>
        </van-row>
    </header>
</template>

<script>
export default {
    name: "TheNavbar"
}
</script>

<style scoped>
.logo {
    display: flex;
    align-items: center;
    margin: 24px auto;
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