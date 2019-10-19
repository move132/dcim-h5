import Vue from "vue";
import Router from "vue-router";
import store from "store/index";
Vue.use(Router);

// 开发环境不使用懒加载, 因为懒加载页面太多的话会造成webpack热更新太慢, 所以只有生产环境使用懒加载
const _import = require("./import-" + process.env.NODE_ENV);
const router = new Router({
    scrollBehavior: () => ({ y: 0 }),
    routes: [
        {
            path: "*",
            redirect: { name: "404" }
        },
        {
            path: "/",
            redirect: "/login"
        },
        {
            path: "/404",
            name: "404",
            component: _import("common/404")
        },
        {
            path: "/home",
            name: "home",
            component: _import("home"),
            meta: {
                auth: true, // 是否需要登录
                keepAlive: true // 是否缓存组件
            }
        },
        {
            path: "/my",
            name: "my",
            component: _import("my"),
            meta: {
                auth: true, // 是否需要登录
                keepAlive: true // 是否缓存组件
            }
        },
        {
            path: "/warnrecord",
            name: "warnrecord",
            component: _import("warn-record"),
            meta: {
                auth: true, // 是否需要登录
                keepAlive: true // 是否缓存组件
            }
        },
        {
            path: "/login",
            name: "login",
            component: _import("common/login"), // 登录
            meta: {
                auth: false,
                keepAlive: true
            }
        },
        {
            path: "/motorroom",
            name: "motorroom",
            component: _import("motorroom"),
            meta: {
                auth: true, // 是否需要登录
                keepAlive: true // 是否缓存组件
            }
        },
        {
            path: "/myaccept",
            name: "myaccept",
            component: _import("myaccept"),
            meta: {
                auth: true, // 是否需要登录
                keepAlive: true // 是否缓存组件
            }
        },
        {
            path: "/deviceinfo",
            name: "deviceinfo",
            component: _import("deviceInfo"),
            meta: {
                auth: true, // 是否需要登录
                keepAlive: true // 是否缓存组件
            }
        }
    ]
});

// 全局路由钩子函数 对全局有效
router.beforeEach((to, from, next) => {
    let auth = to.meta.auth;
    let token = localStorage.getItem("token"); // 当跳转时携带指定方向参数则优先使用指定参数
    // 需要登录
    if (auth) {
        if (token) {
            next();
        } else {
            if (to.name !== "login") {
                next({
                    path: "/login",
                    query: {
                        redirect: to.fullPath
                    }
                });
            }
        }
    } else {
        next();
    }
});
export default router;
