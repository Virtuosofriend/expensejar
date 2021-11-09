import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter);

const ifAuthenticated = (to, from, next) => {
    console.log(localStorage.getItem("expenseJar_uid"))
    if ( localStorage.getItem("expenseJar_uid") ) {
        return next("/home");
    }
    next("/login");
};

const routes = [
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
            hasMenu:    false,
            hasNavbar:  false
        },
		component: () => 
            import(/* webpackChunkName: "auth" */ "@/views/Auth/Login.vue"),
	},
    {
        path: "/welcome-screen",
        name: "Welcome",
        meta: {
            hasMenu:    false,
            hasNavbar:  false
        },
        component: () =>
            import(/* webpackChunkName: "welcome" */ "@/views/Welcome.vue")
    },
    {
        path: "/home",
        name: "Home",
        meta: {
            hasMenu:    true,
            hasNavbar:  true
        },
        component: () =>
            import(/* webpackChunkName: "home" */ "@/views/Home.vue"),
    },
    {
        path: "/new-expense",
        name: "NewExpense",
        meta: {
            hasMenu:    false,
            hasNavbar:  false
        },
        component: () =>
            import(/* webpackChunkName: "home" */ "@/views/Homepage/CreateExpenseDialog.vue")
    },
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
    {
        path: "/settings/create-home",
        name: "CreateHome",
        meta: {
            hasMenu:    false,
            hasNavbar:  false
        },
        component: () =>
            import(/* webpackChunkName: "settings" */ "@/views/Settings/CreateHome.vue")
    }
]

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes,
    scrollBehavior () {
        return { 
            x: 0, 
            y: 0 
        };
    }
});

export default router
