<template>
	<div class="results__wrap">
		<TableLoading v-if="loading" />
		<div v-else-if="error">{{ error }}</div>
		<template v-else>
			<div v-if="data.length === 0">검색결과가 없습니다</div>
			<template v-if="type === 'movie'">
				<ResultMovie
					:current="current"
					:data="data"
					:total="total"
					:keyword="keyword"
					@currentValue="currentValue"
					@fetchSearch="fetchSearch"
				/>
			</template>
			<template v-else>
				<ResultPerson :data="data" :keyword="keyword" />
			</template>
		</template>
	</div>
</template>
<script setup>
import TableLoading from '@/components/TableLoading.vue';
import ResultMovie from '@/components/ResultMovie.vue';
import ResultPerson from '@/components/ResultPerson.vue';
import { useRoute } from 'vue-router';
import { ref, watch } from 'vue';
import { movieApi } from '@/api';

const route = useRoute();
const type = ref(route.query.type);
const keyword = ref(route.query.keyword);
const loading = ref(false);
const error = ref(null);
const current = ref(1);
const data = ref(null);
const total = ref(0);

// console.log(type.value, keyword.value);

async function fetchSearch() {
	try {
		loading.value = true;
		const res = await movieApi.search(type.value, keyword.value, current.value);
		// console.log(res.data);
		data.value = type.value === 'movie' ? res.data.results : res.data.results[0];
		total.value = res.data.total_results;
	} catch (err) {
		error.value = err;
	} finally {
		loading.value = false;
	}
}
fetchSearch();
watch(route, newData => {
	// console.log(newData.query.type);
	type.value = newData.query.type;
	keyword.value = newData.query.keyword;
	fetchSearch();
});
const currentValue = value => {
	current.value = value;
};
</script>
