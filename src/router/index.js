import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/views/HomePage.vue';
import LoginPage from '@/views/LoginPage.vue';
import SignupPage from '@/views/SignupPage.vue';
import PopularPage from '@/views/PopularPage.vue';
import DiscoverPage from '@/views/DiscoverPage.vue';
import SearchPage from '@/views/SearchPage.vue';
import DetailPage from '@/views/DetailPage.vue';
import PostPage from '@/views/PostPage.vue';
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
		path: '/post',
		name: 'Post',
		component: PostPage,
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
// router.beforeEach((to, from) => {
// 	console.log('to: ', to);
// 	console.log('from: ', from);
// });

export default router;
