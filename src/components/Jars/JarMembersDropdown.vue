<template>
	<v-select 
		:model-value="modelValue"
		:items="members"
		item-title="text"
		item-value="id"
		flat   
		hide-details 
		label="Select a member"
		bg-color="primary" 
		color="white" 
		solo
		density="compact"
		single-line
		clearable
		@update:modelValue="handleUpdateEvent"
	/>
</template>

<script>
export default {
    name: "JarMembersDropdown",

    props: {
        members: {
            required: true,
            type: Array
        },
        // eslint-disable-next-line vue/require-default-prop
        modelValue: Number,
    },

    emits: ["update:modelValue"],

    setup(props, { emit }) {
        return {
            handleUpdateEvent
        }

        function handleUpdateEvent(ev) {
            emit("update:modelValue", ev);
        }
    }
}
</script>