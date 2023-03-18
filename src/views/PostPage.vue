<template>
	<div class="post__wrap">
		<div class="row items-center justify-between">
			<h2 class="post_title">Post</h2>
			<q-btn color="primary" @click="editModeToggle">{{ editMode }}</q-btn>
		</div>
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
					<PostView v-if="!mode" :data="td" />
					<PostEdit v-else :data="td" @editData="editData" />
				</tr>
			</tbody>
		</q-markup-table>
	</div>
</template>
<script setup>
import TableLoading from '@/components/TableLoading.vue';
import PostView from '@/components/post/PostView.vue';
import PostEdit from '@/components/post/PostEdit.vue';
import { computed, ref } from 'vue';
import { postApi } from '@/api/posts';
import { useMainStore } from '@/stores/main';
import { storeToRefs } from 'pinia';
import { useQuasar } from 'quasar';

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
		const res = await postApi.post();
		data.value = res.data;
	} catch (err) {
		error.value = err;
	} finally {
		loading.value = false;
	}
}
fetchData();

const quasar = useQuasar();
function showNotify(message) {
	quasar.notify({
		message: message,
		color: 'teal',
		position: 'top-right',
	});
}
const editError = ref(null);
const { loadingShown } = storeToRefs(useMainStore());
const editData = async (id, content) => {
	try {
		loadingShown.value = true;
		await postApi.edit(id, content);
	} catch (err) {
		editError.value = err;
	} finally {
		// await fetchData();
		data.value = data.value.map(item => {
			return item.id === id ? { ...content } : item;
		});
		loadingShown.value = false;
		showNotify('수정완료');
	}
};

const mode = ref(true);
const editMode = computed(() => {
	return mode.value === false ? '수정' : '완료';
});
const editModeToggle = () => {
	mode.value = !mode.value;
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
