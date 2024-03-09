<template>
	<v-card
		elevation="0"
		class="pa-2"
		rounded="medium"
		:color="color"
	>
		<v-card-text class="text-surface font-weight-medium px-2">
			{{ memberName }}
		</v-card-text>
		<v-card-text class="text-surface text-xl font-weight-bold pt-0 px-2">
			{{ expense }}€
		</v-card-text>
	</v-card>
</template>

<script>


export default {
    name: "CurrentMonthMemberExpenseCard",
    props: {
        expense: {
            required: true,
            type: Number
        },
        memberName: {
            required: true,
            type: String
        },
        color: {
            type: String,
            default: "primary"
        }
    },
}
</script>
