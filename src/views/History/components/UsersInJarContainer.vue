<script>
import { useApi } from "@/api/composables/useApi";
import { fetchSpecificJar } from "@/api/jarsApi";
import { useJarStore } from "@/stores/JarStore";

export default {
    name: "UsersInJarContainer",

    props: {
        jarId: {
            required: true,
            type: Number
        }
    },

    setup(props, ctx) {
        const jarStore = useJarStore();
        
        // API layer variables
        const {
            data,
            exec: getJarsFn,
            FetchJarsStatusSuccess,
            FetchJarsStatusError,
            FetchJarsStatusIdle,
            FetchJarsStatusPending
        } = useApi("FetchJars", fetchSpecificJar);

        fetchCurrentJarMembers();

        return () => ctx.slots.default({
            members: jarStore.members
        });

        async function fetchCurrentJarMembers() {
            const payload = {
                id: props.jarId
            }
			await getJarsFn(payload);

            if ( FetchJarsStatusError.value ) {
                return
            }

            const members = data.value.data.data.jar_members.map(members => members.directus_users_id);
            jarStore.setJarMembers(members);
        }
    }
}
</script>