<template>
	<header>
		<div class="main__inner">
			<h1>
				<q-btn to="/" flat color="primary" label="Index" />
			</h1>
			<nav>
				<q-btn-group outline>
					<q-btn to="/popular" outline label="Popular" :class="activeLink('popular')" />
					<q-btn to="/discover" outline label="Discover" :class="activeLink('discover')" />
					<q-btn to="/post" outline label="Post" :class="activeLink('post')" />
				</q-btn-group>
			</nav>
			<button class="search_btn" type="button" @click="store.searchToggle"><span>Search</span></button>
			<!--		<div class="links">-->
			<!--			<q-btn to="/login" flat label="Login" />-->
			<!--			<q-btn to="/signup" flat label="Sign Up" />-->
			<!--		</div>-->
			<template v-if="store.searchShown">
				<TheSearch @onSearchSubmit="onSearchSubmit" />
			</template>
		</div>
	</header>
</template>
<script setup>
import TheSearch from '@/layouts/TheSearch.vue';
import { useRoute, useRouter } from 'vue-router';
// import { storeToRefs } from 'pinia';
import { useMainStore } from '@/stores/main';

const store = useMainStore();
const route = useRoute();
const router = useRouter();
const activeLink = name => {
	const path = route.path;
	return path.includes(name) ? 'active' : '';
};
const onSearchSubmit = (select, keyword) => {
	// console.log(select.value, keyword);
	router.push(`/search/?type=${select.value}&keyword=${keyword}`);
};
// const { searchShown } = storeToRefs(store);
</script>
<style scoped lang="scss">
h1 a {
	display: block;
}
nav {
	margin-left: 20px;
}
.active {
	color: $blue;
}
.search_btn {
	margin-left: auto;
	width: 42px;
	height: 36px;
	background: $blue url(../assets/icon_search.svg) no-repeat center;
	border: 0;
	font-size: 0;
	border-radius: 3px;
	cursor: pointer;
}
</style>
