<template>
	<div class="popular__wrap">
		<h2>Discover</h2>
		<TableForm @onSubmit="onSubmit" />
		<h3>Result</h3>
		<TableLoading v-if="loading" />
		<div v-else-if="error">{{ error }}</div>
		<TableLists v-else :data="data" @goDetail="goDetail" />
		<div class="q-pa-lg flex flex-center">
			<q-pagination v-model="current" :max="10" :max-pages="5" :ellipses="false" :boundary-numbers="false" direction-links @click="onSubmit" />
		</div>
	</div>
</template>
<script setup>
import TableForm from '@/components/TableForm.vue';
import TableLists from '@/components/TableLists.vue';
import TableLoading from '@/components/TableLoading.vue';
import { ref } from 'vue';
import { api } from '@/api';
import { useRouter } from 'vue-router';

const router = useRouter();
const current = ref(1);
const loading = ref(false);
const error = ref(null);
const data = ref([]);

const onSubmit = (sort, genres) => {
	fetchData(sort, genres);
};
async function fetchData(sort = 'release_date.desc', genres = '') {
	try {
		const genre = genres !== '' ? genres.join() : '';
		loading.value = true;
		const res = await api.get('discover/movie', {
			params: {
				'vote_average.gte': 5,
				page: current.value,
				sort_by: sort, // popularity.desc
				with_genres: genre,
			},
		});
		data.value = res.data.results;
	} catch (err) {
		error.value = err;
	} finally {
		loading.value = false;
	}
}
fetchData();
const goDetail = id => {
	router.push(`/movies/${id}`);
};
</script>
<style scoped lang="scss">
.popular__wrap {
	padding: 30px 0 50px;
	h2 {
		padding-bottom: 20px;
	}
	h3 {
		padding: 30px 0 20px;
		font-weight: bold;
	}
}
</style>
