import { Alias, ConfigEnv, defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import autoprefixer from 'autoprefixer';

// 开发服务
function server(env: Record<string, string>) {
	return {
		host: '0.0.0.0',
		port: 4021,
		open: true,
		proxy: {
			'/api': {
				target: env.PROXY_PATH_API,
				changeOrigin: true,
				rewrite: (path: string) => path.replace(/^\/api/, ' '),
			},
		},
	};
}

// https://vitejs.dev/config/
export default defineConfig((mode: ConfigEnv) => {
	const env = loadEnv(mode.mode, __dirname, '');

	// 别名配置
	const alias: Alias[] = [
		{
			find: '@',
			replacement: path.resolve(__dirname, './src'),
		},
	];

	return {
		plugins: [
			vue(),
			Components({
				resolvers: [
					AntDesignVueResolver({
						importStyle: false, // css in js
					}),
				],
			}),
		],
		resolve: {
			alias,
		},
		css: {
			postcss: {
				plugins: [autoprefixer()],
			},
			preprocessorOptions: {
				less: {
					javascriptEnabled: true,
				},
				scss: {
					additionalData: `@import './src/assets/styles/common/mixin.scss';`,
				},
			},
		},
		server: server(env),
	};
});
