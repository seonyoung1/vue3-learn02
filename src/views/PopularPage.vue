<template>
	<div class="popular__wrap">
		<h2>Popular Movies</h2>
		<TableLoading v-if="loading" />
		<div v-else-if="error">{{ error }}</div>
		<TableLists v-else :data="popular" />
		<div class="q-pa-lg flex flex-center">
			<q-pagination v-model="current" :max="10" :max-pages="5" :ellipses="false" :boundary-numbers="false" direction-links @click="goFetch" />
		</div>
	</div>
</template>
<script setup>
import TableLists from '@/components/TableLists.vue';
import TableLoading from '@/components/TableLoading.vue';
import { movieApi } from '@/api';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const current = ref(1);
const loading = ref(false);
const error = ref(null);
const popular = ref([]);
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
};
</script>
<style scoped lang="scss">
.popular__wrap {
	padding: 30px 0 50px;
	h2 {
		padding-bottom: 20px;
	}
}
</style>
