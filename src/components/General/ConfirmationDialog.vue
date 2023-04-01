<template>
    <v-dialog
        v-model="dialog"
        persistent
        width="90%"
    >
        <v-card>
            <v-card-title class="text-h5 text-center mt-4">
                Are you sure?
            </v-card-title>
            <v-card-text>
                This action is permanent and can not be undone. Are you sure you would like to proceed?
            </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                color="primary"
                variant="text"
                @click="emitCloseDialog"
            >
                Cancel
            </v-btn>
            <v-btn
                color="primary"
                @click="handleConfirmButton"
            >
                OK
            </v-btn>
        </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import { useGeneralStore } from "@/stores/GeneralStore";
import { computed } from "vue";
export default {
    name: "ConfirmationDialog",
    props: {
        confirmationAction: {
            required: true,
            type: Function,
            default: () => false
        },
    },
    emits: ["close-dialog"],
    setup(props, {emit}) {
        const generalStore = useGeneralStore();
        const dialog = computed(() => generalStore.confirmationDialog)
        return {
            emitCloseDialog,
            dialog,
            handleConfirmButton
        }
        function emitCloseDialog() {
            generalStore.setConfirmationDialog(false);
        }
        function handleConfirmButton() {
            props.confirmationAction();
            emitCloseDialog();
            emit("close-dialog");
        }
    }
}
</script>