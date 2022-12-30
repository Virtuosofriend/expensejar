<script>
export default {
    name: "TransactionAvatarProvider",
    props: {
        members: {
            required: true,
            type: Array
        },

        userId: {
            required: true,
            type: String
        }
    },

    setup(props, ctx) {
        const userProfile = props.members.find(user => user.id === props.userId);

        return () => ctx.slots.default({
            userProfile
        });
    }
}
</script>