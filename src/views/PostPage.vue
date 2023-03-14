<template>
	<div class="post__wrap">
		<h2 class="post_title">Post</h2>
		<TableLoading v-if="loading" />
		<div v-else-if="error">{{ error }}</div>
		<q-markup-table v-else>
			<colgroup>
				<col width="25%" />
				<col width="48%" />
				<col width="10%" />
				<col width="12%" />
			</colgroup>
			<thead>
				<tr>
					<th v-for="th in columns" :key="th.name" :class="`text-${th.align}`">
						{{ th.label }}
					</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="td in data" :key="td.id">
					<PostContent :data="td" @editData="editData" />
				</tr>
			</tbody>
		</q-markup-table>
	</div>
</template>
<script setup>
import TableLoading from '@/components/TableLoading.vue';
import PostContent from '@/components/post/PostContent.vue';
import { ref } from 'vue';
import { posts } from '../api/posts';
import { useMainStore } from '@/stores/main';
import { storeToRefs } from 'pinia';

const loading = ref(false);
const error = ref(null);
const data = ref([]);
const columns = [
	{
		name: 'title',
		label: '제목',
	},
	{
		name: 'overview',
		label: '줄거리',
	},
	{
		name: 'vote_count',
		label: '추천수',
	},
	{
		name: 'release_date',
		label: '개봉 날짜',
	},
];
async function fetchData() {
	try {
		loading.value = true;
		const res = await posts.get('');
		data.value = res.data;
	} catch (err) {
		error.value = err;
	} finally {
		loading.value = false;
	}
}
fetchData();

const editError = ref(null);
const { loadingShown } = storeToRefs(useMainStore());
const editData = async (id, content) => {
	// console.log(content);
	try {
		loadingShown.value = true;
		await posts.patch(`/${id}`, content);
	} catch (err) {
		editError.value = err;
	} finally {
		loadingShown.value = false;
	}
};
</script>
<style scoped lang="scss">
.post__wrap {
	padding-bottom: 100px;
}
.post_title {
	padding: 20px 0;
}
.q-table__card {
	box-shadow: inherit;
	border: 1px solid #ccc;
}
.q-table {
	thead {
		background-color: #f3f3f3;
	}
}
</style>
