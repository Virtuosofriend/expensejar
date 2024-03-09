<template>
	<v-container>
		<v-row no-gutters>
			<v-col cols="12">
				<div class="d-flex align-center">
					<members-of-jar-container
						:jar-id="activeJar"
					>
						<profile-settings-menu
							:user-avatar="user.avatar"
						/>
					</members-of-jar-container>
					<div class="ml-4 ml-auto">
						<v-btn
							color="transparent"
							icon="fa-solid fa-jar"
							size="small"
							:selected-class="activeRoute === routeNames.HISTORY ? 'selected' : ''"
							:to="{ name: routeNames.HISTORY, query: { month: currentMonth, year: currentYear } }"
						/>
						<v-btn
							color="transparent"
							icon="fa-solid fa-chart-simple"
							size="small"
							:to="{ name: routeNames.COMPARE, query: { month: currentMonth, year: currentYear } }"
						/>
					</div>
				</div>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import { useRoute } from "vue-router";
import { computed, inject } from "vue";
import { useUserStore } from "@/stores/UserStore";
import routeNames from "@/common/constants/routeNames";

import MembersOfJarContainer from "@/components/General/containers/MembersOfJarContainer.vue";
import ProfileSettingsMenu from "@/components/NavBar/ProfileSettingsMenu.vue";

export default {
    name: "HeaderBarAvatarDropdown",
    components: {
        MembersOfJarContainer,
        ProfileSettingsMenu,
    },
    setup() {
        const userStore = useUserStore();
        const route = useRoute();
        const activeRoute = computed(() => route.name);
        const $date = inject("date");
        const currentMonth = $date().month();
        const currentYear = $date().year();

        return {
            user: userStore.profile,
            routeNames,
            activeRoute,
            activeJar: userStore.active_jar,
            currentMonth,
            currentYear
        }
    }

}
</script>