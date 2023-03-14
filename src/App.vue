<template>
	<TheHeader />
	<main class="main__inner">
		<RouterView />
	</main>
	<div class="loading" v-if="store.loadingShown">
		<q-spinner color="primary" size="3em" />
	</div>
</template>

<script setup>
import TheHeader from '@/layouts/TheHeader.vue';
import { useMainStore } from './stores/main';

const store = useMainStore();
</script>

<style>
.loading {
	position: fixed;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	background-color: rgba(255, 255, 255, 0.5);
	z-index: 10000;
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
