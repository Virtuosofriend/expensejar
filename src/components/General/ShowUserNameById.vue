<script>
export default {
    name: "ShowUserNameById",

    props: {
        tag: { 
            required:   true,
            type:       String,
            default:    "span"
        }
    },

    computed: {

        printUserName() {
            // if ( this.usersList.length > 0 ) {
            //     return this.usersList.find(elem => elem.id === this.userId).username;
            // }

            return "Dimitris";
        }
    },

    render(createElement) {
        return createElement(
            this.tag,
            {},
            this.printUserName
        )
    }
}
</script>