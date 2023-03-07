<template>
	<div class="popular__wrap">
		<h2>Popular Movies</h2>
		<div v-if="loading">loading: {{ loading }}</div>
		<div v-else-if="error">{{ error }}</div>
		<template v-else>
			<table class="q-table">
				<colgroup>
					<col width="40%" />
					<col width="20%" />
					<col width="20%" />
					<col width="20%" />
				</colgroup>
				<thead>
					<tr>
						<th v-for="th in columns" :key="th.name" :class="`text-${th.align}`">
							{{ th.label }}
						</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="td in popular" :key="td.id" @click="goDetail(td.id)">
						<td class="text-left">
							{{ td.title }}
							<span class="original">{{ td.original_title }}</span>
						</td>
						<td class="text-left">{{ td.genre_ids }}</td>
						<td class="text-center">{{ td.vote_average }}</td>
						<td class="text-center">{{ td.release_date }}</td>
					</tr>
				</tbody>
			</table>
		</template>
		<q-pagination v-model="current" :max="100" input @click="goFetch" class="justify-center" />
	</div>
</template>
<script setup>
import { movieApi } from '@/api';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const current = ref(1);
const loading = ref(false);
const error = ref(null);
const popular = ref([]);
const columns = [
	{
		name: 'title',
		required: true,
		label: '제목',
		align: 'left',
		sortable: true,
	},
	{
		name: 'genre',
		label: '장르',
		align: 'left',
	},
	{
		name: 'vote_average',
		label: '별점',
		align: 'center',
	},
	{
		name: 'release_date',
		label: '개봉 날짜',
		align: 'center',
	},
];
async function fetchData(page) {
	try {
		loading.value = true;
		const res = await movieApi.popular(page);
		popular.value = res.data.results;
	} catch (err) {
		// console.error(e);
		error.value = err;
	} finally {
		loading.value = false;
	}
}
fetchData(current.value);
const goFetch = () => {
	fetchData(current.value);
	console.log(current.value);
};
const goDetail = id => {
	console.log(id);
	router.push(`/popular/${id}`);
};
</script>
<style scoped lang="scss">
.popular__wrap {
	padding: 0 0 50px;
}
.q-table {
	thead {
		background-color: #f3f3f3;
	}
}
.original {
	display: block;
	font-size: 0.8rem;
	color: #888;
}
</style>
