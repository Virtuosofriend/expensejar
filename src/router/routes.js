import { useUserStore } from "../stores/UserStore";
import routeNames from "../common/constants/routeNames";

const ifAuthenticated = (to, from, next) => {
    const userStore = useUserStore();

    if ( userStore.profile.id ) {
        return next({ name: routeNames.HOME });
    }
    next({ name: routeNames.LOGIN });
};

export default [
    {
        path: "/",
        name: routeNames.INTRO,
        beforeEnter: ifAuthenticated,
        component: () => 
            import(/* webpackChunkName: "auth" */ "@/views/Intro.vue"),
    },
    {
        path: "/login",
        name: routeNames.LOGIN,
        meta: {
            hasNavbar:   false,
            isMenuFixed: false,
            hasMenu:    false,
        },
        component: () => import("@/views/Auth/Login.vue")            
    },
    {
        path: "/home",
        name: routeNames.HOME,
        meta: {
            hasNavbar:   true,
            isMenuFixed: false,
            hasMenu:    true,
        },
        component: () => import("@/views/Home.vue")
    },
    {
        path: "/new-expense",
        name: routeNames.NEW_EXPENSE,
        meta: {
            hasNavbar:   false,
            isMenuFixed: false,
            hasMenu:    false,
        },
        component: () =>
            import(/* webpackChunkName: "home" */ "@/views/Home/CreateExpense.vue")
    },
    {
        path: "/history",
        name: routeNames.HISTORY,
        meta: {
            hasNavbar:   true,
            isMenuFixed: false,
            hasMenu:     true,
        },
        props: true,
        component: () =>
            import(/* webpackChunkName: "history" */ "@/views/History.vue")
    },
    {
        path: "/compare",
        name: routeNames.COMPARE,
        meta: {
            hasMenu:    true,
            hasNavbar:  true,
        },
        component: () =>
            import(/* webpackChunkName: "compare" */ "@/views/Compare.vue")
    },
    {
        path: "/settings",
        name: routeNames.SETTINGS,
        meta: {
            hasMenu:    true,
            hasNavbar:  true,
        },
        component: () =>
            import(/* webpackChunkName: "settings" */ "@/views/Settings.vue")
    },
    {
        path: "/expense-details/:expenseId",
        name: routeNames.EXPENSE_DETAILS,
        meta: {
            hasMenu: false,
            hasNavbar: false,
        },
        component: () =>
            import(/* webpackChunkName: "details" */ "@/views/ExpenseDetails.vue")
    }
];
