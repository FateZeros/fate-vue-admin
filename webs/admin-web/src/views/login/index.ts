import { defineComponent, onBeforeMount, reactive, ref } from 'vue';
import { getCapture } from '@/api/login';

export default defineComponent({
	name: 'VLogin',
	setup() {
		const form = reactive({
			userName: '',
			password: '',
			remember: '',
		});
		const loading = ref<boolean>(false);

		async function onFinish() {
			console.log(form, 11);
		}

		async function getCaptchaImage() {
			try {
				const res = await getCapture();
				console.log(res, 11);
			} catch (err) {
				console.log(err);
			}
		}

		onBeforeMount(() => {
			getCaptchaImage();
		});

		return {
			form,
			loading,
			onFinish,
		};
	},
});
