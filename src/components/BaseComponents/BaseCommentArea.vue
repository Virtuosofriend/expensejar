<template>
    <v-textarea
        solo
        flat
        dark
        background-color="primary" 
        hide-details
        name="commentText"
        v-model="comment"
        label="Masoutis, groceries..."
        @input="emitComment()"
    ></v-textarea>
</template>

<script>
export default {
    name: "Base__textarea",

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