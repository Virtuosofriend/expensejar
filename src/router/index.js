import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter)

const routes = [
	{
		path: "/login",
		name: "Login",
		component: () => 
            import(/* webpackChunkName: "auth" */ "@/views/Auth/Login.vue"),
	},
    {
        path: "/welcome-screen",
        name: "Welcome",
        component: () =>
            import(/* webpackChunkName: "welcome" */ "@/views/Welcome.vue")
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
