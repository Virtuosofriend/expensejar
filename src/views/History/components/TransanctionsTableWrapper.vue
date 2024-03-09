<template>
	<div class="table">
		<slot />
	</div>
</template>

<script>
export default {
    name: "TransanctionsTableWrapper",
}
</script>

<style scoped lang="scss">
.table {
    display: flex;
    align-items: center;
    flex-direction: column;
    background-color: rgba(var(--v-theme-background));
}
</style>