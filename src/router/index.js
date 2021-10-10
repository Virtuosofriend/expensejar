import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter)

const routes = [
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
            import(/* webpackChunkName: "home" */ "@/views/Home.vue")
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
        path: "/settings",
        name: "Settings",
        meta: {
            hasMenu:    true,
            hasNavbar:  true
        },
        component: () =>
            import(/* webpackChunkName: "settings" */ "@/views/Settings.vue")
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
})

export default router
