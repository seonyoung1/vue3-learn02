<template>
	<TableLoading v-if="loading" />
	<div v-else-if="error">{{ error }}</div>
	<div v-else class="row q-gutter-x-md details__wrap">
		<div class="col poster" v-if="data.poster_path">
			<img :src="`https://image.tmdb.org/t/p/w300/${data.poster_path}`" alt="" />
		</div>
		<div class="col-9 q-gutter-y-md">
			<h2>
				{{ data.title }} <span class="original">{{ data.original_title }}</span>
			</h2>
			<div class="q-gutter-xs">
				<q-badge v-for="item in data.genres" :key="item.id" outline color="blue">{{ item.name }}</q-badge>
			</div>
			<p class="tagline" v-if="data.tagline !== ''">"{{ data.tagline }}"</p>
			<ul class="q-gutter-xs">
				<li>개봉일: {{ data.release_date }}</li>
				<li>러닝타임: {{ data.runtime }}분</li>
				<li>평점: {{ data.vote_average }}</li>
			</ul>
			<p>{{ data.overview }}</p>
		</div>
		<template v-if="data.videos.results.length > 0">
			<div class="col-12">
				<h3>관련 영상</h3>
				<div class="row q-gutter-md">
					<div v-for="item in data.videos.results" :key="item.key">
						<iframe
							width="400"
							height="225"
							:src="`https://www.youtube.com/embed/${item.key}`"
							title="YouTube video player"
							frameborder="0"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
							allowfullscreen
						></iframe>
						<p>{{ item.name }}</p>
					</div>
				</div>
			</div>
		</template>
	</div>
</template>
<script setup>
import TableLoading from '@/components/TableLoading.vue';
import { useRoute } from 'vue-router';
import { ref } from 'vue';
import { movieApi } from '../api';
const route = useRoute();
const id = route.params.id;
const loading = ref(false);
const error = ref(null);
const data = ref({});
async function fetchData() {
	try {
		loading.value = true;
		const res = await movieApi.detail(id);
		data.value = res.data;
		// console.log(res.data);
	} catch (err) {
		error.value = err;
	} finally {
		loading.value = false;
	}
}
fetchData();
</script>
<style scoped lang="scss">
.details__wrap {
	padding: 30px 0;
	.original {
		font-size: 0.65em;
		font-weight: normal;
		color: #888;
		display: inline-block;
		padding-left: 10px;
	}
	.poster {
		img {
			width: 100%;
			display: block;
		}
	}
}
h2 {
	font-size: 2em;
}
h3 {
	padding: 30px 0 10px;
	font-weight: bold;
}
.tagline {
	font-weight: bold;
	font-size: 1.4em;
}
</style>
