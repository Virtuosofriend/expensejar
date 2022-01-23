<template>
    <v-textarea
        v-model="comment"
        solo
        flat
        dark
        background-color="primary" 
        hide-details
        name="commentText"
        label="Masoutis, groceries..."
        @input="emitComment()"
    ></v-textarea>
</template>

<script>
export default {
    name: "BaseTextarea",

    data() {
        return {
            comment: null
        }
    },

    methods: {
        emitComment() {
            this.$emit("input", this.comment);
        }
    }
}
</script>

<style>

</style>