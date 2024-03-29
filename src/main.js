import { createApp } from 'vue';
import { Quasar, Notify } from 'quasar';
import { createPinia } from 'pinia';
import { VueQueryPlugin } from 'vue-query';
import App from './App.vue';
import router from './router';
import './css/_reset.scss';
import '@quasar/extras/material-icons/material-icons.css';
import 'quasar/dist/quasar.css';
import './css/style.scss';

const app = createApp(App);
app.use(Quasar, {
	plugins: {
		Notify,
	}, // import Quasar plugins and add here
	config: {
		notify: {
			/* look at QuasarConfOptions from the API card */
		},
	},
});
app.use(createPinia());
app.use(router);
app.use(VueQueryPlugin);
app.mount('#app');
