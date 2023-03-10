import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/views/HomePage.vue';
import LoginPage from '@/views/LoginPage.vue';
import SignupPage from '@/views/SignupPage.vue';
import PopularPage from '@/views/PopularPage.vue';
import DiscoverPage from '@/views/DiscoverPage.vue';
import SearchPage from '@/views/SearchPage.vue';
import DetailPage from '@/views/DetailPage.vue';
import NotFound from '@/views/NotFound.vue';
const routes = [
	{
		path: '/',
		name: 'Home',
		component: HomePage,
	},
	{
		path: '/login',
		name: 'Login',
		component: LoginPage,
	},
	{
		path: '/signup',
		name: 'Sign',
		component: SignupPage,
	},
	{
		path: '/popular',
		name: 'Popular',
		component: PopularPage,
	},
	{
		path: '/discover',
		name: 'Discover',
		component: DiscoverPage,
	},
	{
		path: '/movies/:id',
		name: 'Detail',
		component: DetailPage,
	},
	{
		path: '/search',
		name: 'Search',
		component: SearchPage,
	},
	{
		path: '/:pathMatch(.*)*',
		name: 'NotFound',
		component: NotFound,
	},
];
const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
});
export default router;
