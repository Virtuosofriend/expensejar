<template>
	<v-app>
        <section v-if="showNavBar">
            <header-nav-bar></header-nav-bar>
        </section>
        <router-view :key="homeId"></router-view>

        <div 
            v-show="showMenu"
            class="navigation__ shadow" 
        >
            <bottom-navigation-menu class="navigation__wrapper"></bottom-navigation-menu>
        </div>
    </v-app>
</template>

<script>
import { withAsync } from "@/helpers/withAsync";
import { apiStatus } from "@/api/constants/apiStatus";
import { apiStatusComputed } from "@/api/helpers/computedApiStatus";
import { fetchUsers } from "@/api/usersApi.js";
import { fetchAllHomes } from "@/api/homesApi.js";

import { mapState } from "vuex";

export default {
	name: "App",

    components: {
        BottomNavigationMenu: () => import("./layout/BottomNavigationMenu"),
        HeaderNavBar: () => import("./layout/HeaderBarAvatarDropdown.vue")
    },

    data() {
        return {
            usersListStatus:    apiStatus.Idle
        }
    },

    computed: {
        ...apiStatusComputed("usersListStatus"),

        showMenu() {
            return this.$route.meta.hasMenu;
        },

        showNavBar() {
            return this.$route.meta.hasNavbar;
        },

        ...mapState({
            homeId: state => state.auth.homeId
        })
    },

    methods: {
        async fetchUsersList() {
            this.usersListStatus = apiStatus.Pending;
            let users = [];
			const { response, error } = await withAsync(fetchUsers);

			if (error) {
				this.usersListStatus = apiStatus.Error
				return
			}
			
            if ( response.docs.length > 0 ) {
               response.docs.forEach(elem => {
                    const elementData = elem.data();
                    const elementId = elem.id;
                    users.push({
                        ...elementData,
                        id: elementId
                    });
                });
            }
            this.$store.dispatch("general/fetchUsersList", users)
                .then(() => {
                    this.usersListStatus = apiStatus.Success;
                });
        },
        async fetchAllHomesList() {
            let homes = [];
			const { response, error } = await withAsync(fetchAllHomes);

			if (error) {
				return
			}
			
            if ( response.docs.length > 0 ) {
               response.docs.forEach(elem => {
                    const elementData = elem.data();
                    const elementId = elem.id;
                    homes.push({
                        ...elementData,
                        id: elementId
                    });
                });
            }
            this.$store.dispatch("general/fetchAllHomes", homes);
        }
        
    },

    created() {
        console.info(`ExpenseJAR v${ process.env.VUE_APP_VERSION }`);
        this.fetchUsersList();
        this.fetchAllHomesList();
    }
}
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100;300;400;600;700;800&display=swap");
@import url("./styles/common.scss");
@import url("./styles/components.scss");

.navigation__ {
    position: fixed;
    bottom: 0;
    width: 100%;
    background-color: #3154ac;
    padding: 10px;
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
}
.navigation__wrapper {
    position: relative;
    width: 100vw;
    border-radius: 26px;
    background-color: var(--v-primary-base);
}
</style>