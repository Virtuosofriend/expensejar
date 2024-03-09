<template>
	<v-icon 
		size="x-small"
	>
		{{ icon }}
	</v-icon>
</template>

<script>
export default {
    name: "SortingButtonIcon",

    props: {
        icon: {
            required: true,
            type: String
        }
    }
}
</script>