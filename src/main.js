import { createApp } from 'vue';
import { Quasar } from 'quasar';
import { createPinia } from 'pinia';
import { VueQueryPlugin } from 'vue-query';
import App from './App.vue';
import router from './router';
import '@quasar/extras/material-icons/material-icons.css';
import 'quasar/dist/quasar.css';
import './css/style.scss';

const app = createApp(App);
app.use(Quasar, {
	plugins: {}, // import Quasar plugins and add here
});
app.use(createPinia());
app.use(router);
app.use(VueQueryPlugin);
app.mount('#app');
