<template>
	<header class="row items-center">
		<h1>
			<q-btn to="/" flat color="primary" label="Index" />
		</h1>
		<nav>
			<q-btn-group outline>
				<q-btn to="/popular" outline label="Popular" :class="activeLink('/popular')" />
				<q-btn to="/discover" outline label="Discover" :class="activeLink('/discover')" />
			</q-btn-group>
		</nav>
		<!--		<div class="links">-->
		<!--			<q-btn to="/login" flat label="Login" />-->
		<!--			<q-btn to="/signup" flat label="Sign Up" />-->
		<!--		</div>-->
	</header>
</template>
<script setup>
import { useRoute } from 'vue-router';
const route = useRoute();
const activeLink = name => {
	const path = route.path;
	return name === path ? 'active' : '';
};
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
</style>
