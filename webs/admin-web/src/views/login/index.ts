import { defineComponent, ref } from 'vue';
import CAccount from './components/account/index.vue';
import CBorderCircle from '@/components/border-circle/index.vue';

export default defineComponent({
	name: 'VLogin',
	components: {
		CAccount,
		CBorderCircle,
	},
	setup() {
		const activeKey = ref<string>('account');

		return {
			activeKey,
		};
	},
});
