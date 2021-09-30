import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter)

const routes = [
	{
		path: "/login",
		name: "Login",
        meta: {
            hasMenu: false
        },
		component: () => 
            import(/* webpackChunkName: "auth" */ "@/views/Auth/Login.vue"),
	},
    {
        path: "/welcome-screen",
        name: "Welcome",
        meta: {
            hasMenu: false
        },
        component: () =>
            import(/* webpackChunkName: "welcome" */ "@/views/Welcome.vue")
    },
    {
        path: "/",
        name: "Home",
        meta: {
            hasMenu: true
        },
        component: () =>
            import(/* webpackChunkName: "home" */ "@/views/Welcome.vue")
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
