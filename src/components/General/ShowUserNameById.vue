<script>
import { mapGetters } from "vuex";

export default {
    name: "ShowUserNameById",

    props: {
        userId: {
            required:   true,
            type:       String
        },
        tag: { 
            required:   true,
            default:    "span"
        }
    },

    computed: {
        ...mapGetters({
            usersList: "general/getUsers"
        }),

        printUserName() {
            if ( this.usersList.length > 0 ) {
                return this.usersList.find(elem => elem.id === this.userId).username;
            }

            return "";
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