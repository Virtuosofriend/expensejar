<template>
	<div class="d-flex justify-center align-center text-xs op4 my-2 transaction-label">
		<v-icon 
			color="white"
			icon="fa-solid fa-calendar"
			size="xs"
			class="mx-2"
		/>
		<p class="mr-2">
			{{ diplayedMonth }}
		</p>
	</div>
</template>

<script setup>
import { computed,defineOptions, inject } from "vue";
defineOptions({
    name: "TransactionMonthLabel"
});
const props = defineProps({
    month: {
        type: String,
        required: true
    }
});
const $date = inject("date");
const diplayedMonth = computed(() => $date(props.month).format("D MMM"));
</script>

<style scoped>
.transaction-label::before,
.transaction-label::after {
    content: '';
    width: 38%;
    height: 1px;
    background-color: #fff;
    opacity: .4;
}
</style>