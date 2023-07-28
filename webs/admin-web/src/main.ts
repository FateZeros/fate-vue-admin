import { createApp } from 'vue';
import router from '@/router';
import App from '@/views/app/index.vue';

import '@/assets';

const app = createApp(App);
app.use(router).mount('#app');
