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
			<div class="row q-gutter-x-sm col-10">
				<div v-for="item in genreList" :key="item.id" class="row q-gutter-x-sm">
					<input type="checkbox" :id="`genre-${item.id}`" :value="item.id" v-model="genres" />
					<label :for="`genre-${item.id}`">{{ item.name }}</label>
				</div>
			</div>
			<p class="col-12 tooltip">* 아무것도 선택하지 않으면 전체로 나옵니다</p>
		</div>
		<q-btn label="Search" type="submit" color="primary" />
		<q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
	</form>
</template>
<script setup>
import { ref } from 'vue';
import { useMovieStore } from '@/stores/movie';
defineEmits(['onSubmit']);

const { genreList } = useMovieStore();
const genres = ref([]);
const sort = ref('release_date.desc');
</script>
<style scoped lang="scss">
label {
	padding-left: 3px;
}
.tooltip {
	font-size: 0.9em;
	text-align: right;
	color: #888;
}
</style>
