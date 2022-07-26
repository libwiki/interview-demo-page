import {createRouter, createWebHashHistory} from "vue-router";
import v1 from "./v1.js"; // 控制台页面路由
import Config from "../config/Config";
import {isEmpty} from "../utils/helpers";


// 创建路由
const router = createRouter({
    // history: createWebHistory(import.meta.env.BASE_URL), // 路由模式
    history: createWebHashHistory(import.meta.env.BASE_URL), // 路由模式 #
    routes: [...v1], // 注册路由表
});

router.beforeEach((to, from, next) => {
    // 设置页面的标题
    if (isEmpty(to.meta.title)) {
        document.title = Config.siteName;
    } else {
        document.title = `${to.meta.title} | ${Config.siteName}`;
    }
    next();
});

export default router;
