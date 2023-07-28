import { createRouter, createWebHashHistory } from 'vue-router';
import { staticRoutes } from './routes';

/**
 * 创建一个可以被 Vue 应用程序使用的路由实例
 * @method createRouter(options: RouterOptions): Router
 * @link 参考：https://next.router.vuejs.org/zh/api/#createrouter
 */
export const router = createRouter({
	history: createWebHashHistory(),
	routes: [...staticRoutes],
});

router.beforeEach(async (to, from, next) => {
	console.log(to, from);
	next();
});

router.afterEach(() => {});

export default router;
