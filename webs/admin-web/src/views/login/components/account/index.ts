import { defineComponent, onBeforeMount, reactive, ref } from 'vue';
import { getCapture } from '@/api/login';

interface ICaptureData {
	data: string;
}

// 账号登录
export default defineComponent({
	name: 'CAccount',
	setup() {
		const form = reactive({
			userName: '',
			password: '',
			code: '',
			remember: '',
		});
		const loading = ref<boolean>(false);
		const codeImg = ref<string>('');

		async function onFinish() {
			console.log(form, 11);
		}

		async function getCaptchaImage() {
			try {
				const res = await getCapture<ICaptureData>();
				if (res.code === 200) {
					codeImg.value = res.data;
				}
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
			codeImg,
			getCaptchaImage,
		};
	},
});
