<template>
	<div class="index__wrap">
		<IndexCard :data="nowPlaying" title="Now Playing" />
		<IndexCard :data="topRating" title="Top Rating" />
	</div>
</template>
<script setup>
import IndexCard from '@/components/IndexCard.vue';
import { ref } from 'vue';
import { movieApi } from '../api';

const nowPlaying = ref({});
const topRating = ref({});
const fetchNowPlaying = async () => {
	try {
		const res = await movieApi.nowPlaying();
		nowPlaying.value = res.data.results.slice(0, 5);
	} catch (e) {
		console.log(e);
	}
};
fetchNowPlaying();
const fetchTopRating = async () => {
	try {
		const res = await movieApi.topRating();
		topRating.value = res.data.results.slice(0, 5);
	} catch (e) {
		console.log(e);
	}
};
fetchTopRating();
</script>
<style scoped lang="scss">
.index__wrap {
	padding: 0 0 100px;
}
</style>
