export default [
	// {
	// 	path: "/login",
	// 	name: "Login",
    //     meta: {
    //         hasMenu:    false,
    //         hasNavbar:  false
    //     },
    //     component: () => import("@/views/Auth/Login.vue")            
	// },
    {
        path: "/home",
        name: "Home",
        meta: {
            hasMenu: true,
            hasNavbar: true
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
    // {
    //     path: "/home",
    //     name: "Home",
    //     meta: {
    //         hasMenu:    true,
    //         hasNavbar:  true
    //     },
    //     component: () =>
    //         import(/* webpackChunkName: "home" */ "@/views/Home.vue"),
    // },
    // {
    //     path: "/new-expense",
    //     name: "NewExpense",
    //     meta: {
    //         hasMenu:    false,
    //         hasNavbar:  false
    //     },
    //     component: () =>
    //         import(/* webpackChunkName: "home" */ "@/views/Homepage/CreateExpenseDialog.vue")
    // },
    {
        path: "/history",
        name: "History",
        meta: {
            hasMenu:    true,
            hasNavbar:  true
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
