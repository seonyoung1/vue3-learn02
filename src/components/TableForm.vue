<template>
	<form @submit.prevent="$emit('onSubmit', sort, genres)" class="q-gutter-y-md">
		<div class="row items-center">
			<div class="q-gutter-sm">
				<q-radio v-model="sort" val="release_date.desc" label="Recent" />
				<q-radio v-model="sort" val="popularity.desc" label="Popular" />
			</div>
		</div>
		<div class="row q-gutter-sm">
			<p>장르 선택</p>
			<div class="row q-gutter-x-sm col-6">
				<div v-for="item in genreContents" :key="item.id" class="row">
					<input type="checkbox" :id="`genre-${item.id}`" :value="item.id" v-model="genres" />
					<label :for="`genre-${item.id}`">{{ item.name }}</label>
				</div>
			</div>
			<p class="col-12">* 아무것도 선택하지 않으면 전체로 나옵니다</p>
		</div>
		<q-btn label="Submit" type="submit" color="primary" />
		<q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
	</form>
</template>
<script setup>
import { ref } from 'vue';

defineEmits(['onSubmit']);
const genres = ref([]);
const sort = ref('release_date.desc');

const genreContents = [
	{ id: 28, name: '액션' },
	{ id: 12, name: '모험' },
	{ id: 16, name: '애니메이션' },
	{ id: 35, name: '코미디' },
	{ id: 80, name: '범죄' },
	{ id: 99, name: '다큐멘터리' },
	{ id: 18, name: '드라마' },
	{ id: 10751, name: '가족' },
	{ id: 14, name: '판타지' },
	{ id: 36, name: '역사' },
	{ id: 27, name: '공포' },
	{ id: 10402, name: '음악' },
	{ id: 9648, name: '미스터리' },
	{ id: 10749, name: '로맨스' },
	{ id: 878, name: 'SF' },
	{ id: 10770, name: 'TV 영화' },
	{ id: 53, name: '스릴러' },
	{ id: 10752, name: '전쟁' },
	{ id: 37, name: '서부' },
];
</script>
<style scoped lang="scss">
label {
	padding-left: 3px;
}
</style>
