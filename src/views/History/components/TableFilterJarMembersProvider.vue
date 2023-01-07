<script>
export default {
    name: "TableFilterJarMembersProvider",

    props: {
        membersArray: {
            required: true,
            type: Array
        }
    },

    setup(props, ctx) {
        const users = props.membersArray.map(user => {
            return {
                text: `${ user.first_name } ${ user.last_name }`,
                id: user.id
            }
        });

        return () => ctx.slots.default({
            users
        });
    }
}
</script>