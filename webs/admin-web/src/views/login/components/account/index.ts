import { defineComponent, onBeforeMount, reactive, ref } from 'vue';
import { getCapture, login } from '@/api/login';
import { ICaptureData, ILoginData } from '@/types';
import storage from '@/utils/storage';

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

		async function onSubmit() {
			console.log(form, 11);
			try {
				const params = {
					userName: form.userName,
					password: form.password,
					code: form.code,
				};
				const res = await login<ILoginData>(params);
				if (res.code === 200) {
					storage.set('test', 111);
				}
			} catch (error) {
				console.log(error);
			}
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
			onSubmit,
			codeImg,
			getCaptchaImage,
		};
	},
});
