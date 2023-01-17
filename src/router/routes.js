import { useUserStore } from "../stores/UserStore";

const ifAuthenticated = (to, from, next) => {
    const userStore = useUserStore();

    if ( userStore.userProfile.id ) {
        return next("/home");
    }
    next("/login");
};

export default [
    {
        path: "/",
        name: "Intro",
        beforeEnter: ifAuthenticated,
        component: () => 
            import(/* webpackChunkName: "auth" */ "@/views/Intro.vue"),
    },
	{
		path: "/login",
		name: "Login",
        meta: {
            hasNavbar:   false,
            isMenuFixed: false,
            hasMenu:    false
        },
        component: () => import("@/views/Auth/Login.vue")            
	},
    {
        path: "/home",
        name: "Home",
        meta: {
            hasNavbar:   true,
            isMenuFixed: false,
            hasMenu:    true
        },
        component: () => import("@/views/Home.vue")
    },
    // {
    //     path: "/onboarding",
    //     name: "Onboarding",
    //     meta: {
    //         hasMenu: false,
    //         hasNavbar: false
    //     },
    //     component: () =>
    //         import(/* webpackChunkName: "welcome" */ "@/views/Onboarding.vue")
    // },
    // {
    //     path: "/welcome-screen",
    //     name: "Welcome",
    //     meta: {
    //         hasMenu:    false,
    //         hasNavbar:  false
    //     },
    //     component: () =>
    //         import(/* webpackChunkName: "welcome" */ "@/views/Welcome.vue")
    // },
    {
        path: "/new-expense",
        name: "NewExpense",
        meta: {
            hasNavbar:   false,
            isMenuFixed: false,
            hasMenu:    false
        },
        component: () =>
            import(/* webpackChunkName: "home" */ "@/views/Home/CreateExpense.vue")
    },
    {
        path: "/history",
        name: "History",
        meta: {
            hasNavbar:   true,
            isMenuFixed: false,
            hasMenu:     true
        },
        component: () =>
            import(/* webpackChunkName: "history" */ "@/views/History.vue")
    },
    {
        path: "/compare",
        name: "Compare",
        meta: {
            hasMenu:    true,
            hasNavbar:  true
        },
        component: () =>
            import(/* webpackChunkName: "compare" */ "@/views/Compare.vue")
    },
    {
        path: "/settings",
        name: "Settings",
        meta: {
            hasMenu:    true,
            hasNavbar:  true
        },
        component: () =>
            import(/* webpackChunkName: "settings" */ "@/views/Settings.vue")
    },
    // {
    //     path: "/settings/create-home",
    //     name: "CreateHome",
    //     meta: {
    //         hasMenu:    false,
    //         hasNavbar:  false
    //     },
    //     component: () =>
    //         import(/* webpackChunkName: "settings" */ "@/views/Settings/CreateHome.vue")
    // }
];
