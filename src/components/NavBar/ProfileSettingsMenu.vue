<template>
	<v-menu 
		location="top"
	>
		<template #activator="{ props }">
			<div class="logo">
				<img 
					:src="`${url}assets/${ userAvatar }?key=system-small-cover&download=true`"
					v-bind="props"
				>
			</div>
		</template>
		<v-card
			min-width="260"
			color="accent"
			class="mt-1"
		>
			<v-list>
				<v-list-item
					base-color="error"
					@click="handleLogout()"
				>
					Log out
				</v-list-item>
				<v-divider />
				<v-list-item density>
					<span class="text-xs op6">
						version {{ appVersion }}
					</span>
				</v-list-item>
			</v-list>
		</v-card>
	</v-menu>
</template>

<script>
import { removeCookiesAuthentication } from "@/helpers/authenticationCookie";
import { useRouter } from "vue-router";
import routeNames from "@/common/constants/routeNames";

export default {
    name: "ProfileSettingsMenu",
    props: {
        userAvatar: {
            required: true,
            type: String,
        },
    },
    setup() {
        const url = import.meta.env.VITE_APP_API_URL;
        const appVersion = import.meta.env.APP_VERSION;
        const router = useRouter();
        return {
            url,
            handleLogout,
            appVersion
        }

        function handleLogout() {
            removeCookiesAuthentication();
            router.push({ name: routeNames.LOGIN })
        }
    }
}
</script>

<style lang="scss" scoped>
.logo {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    padding: 2px;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
        object-fit: cover;
        width: 36px;
        border-radius: 50%;
    }
}
</style>