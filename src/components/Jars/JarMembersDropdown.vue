<template>
    <v-select 
        v-model="selectMember" 
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
    ></v-select>
</template>

<script>
import { ref } from "vue";
export default {
    name: "JarMembersDropdown",

    props: {
        members: {
            required: true,
            type: Array
        }
    },

    emits: ["update:modelValue"],

    setup(props, { emit }) {
        const selectMember = ref(null);

        return {
            selectMember,
            handleUpdateEvent
        }

        function handleUpdateEvent() {
            emit("update:modelValue", selectMember)
        }
    }
}
</script>