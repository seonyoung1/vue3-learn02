<template>
	<div class="index__wrap">
		<h2 class="index_title">Now Playing</h2>
		<IndexCard :data="nowPlaying" />
		<h2 class="index_title">Top Rating</h2>
		<IndexCard :data="topRating" />
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
		console.log(res.data.results);
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
.index_title {
	padding: 30px 0;
}
</style>
