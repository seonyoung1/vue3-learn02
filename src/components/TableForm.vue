<template>
	<form @submit.prevent="$emit('onSubmit', sort, genres, startDay, endDay)" class="q-gutter-y-md">
		<div class="row items-center">
			<div class="q-gutter-sm">
				<q-radio v-model="sort" val="release_date.desc" label="최근" />
				<q-radio v-model="sort" val="popularity.desc" label="인기" />
				<q-radio v-model="sort" val="vote_count.desc" label="추천수" />
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
		<div class="row q-gutter-sm items-center date_range">
			<p>기간검색</p>
			<div class="date_range-item">
				<input type="text" v-model="startDay" readonly />
				<q-popup-proxy cover transition-show="scale" transition-hide="scale">
					<q-date
						v-model="startDay"
						:options="date => date <= endDay"
						mask="YYYY-MM-DD"
						v-close-popup="popupClose"
						@update:model-value="changeValue"
					/>
				</q-popup-proxy>
			</div>
			<span> - </span>
			<div class="date_range-item">
				<input type="text" v-model="endDay" />
				<q-popup-proxy cover transition-show="scale" transition-hide="scale">
					<q-date
						v-model="endDay"
						:options="date => date >= startDay"
						mask="YYYY-MM-DD"
						v-close-popup="popupClose"
						@update:model-value="changeValue"
					>
						<div class="row items-center justify-end">
							<q-btn v-close-popup label="Close" color="primary" flat />
						</div>
					</q-date>
				</q-popup-proxy>
			</div>
		</div>
		<div class="row justify-end">
			<q-btn label="Search" type="submit" color="primary" />
			<q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
		</div>
	</form>
</template>
<script setup>
import { ref } from 'vue';
import dayjs from 'dayjs';
import { useMovieStore } from '@/stores/movie';
defineEmits(['onSubmit']);

const { genreList } = useMovieStore();
const genres = ref([]);
const sort = ref('vote_count.desc');
const startDay = ref('1980-01-01');
const endDay = ref(dayjs().format('YYYY-MM-DD'));

const popupClose = ref(false);
const changeValue = () => {
	popupClose.value = true;
	setTimeout(() => (popupClose.value = false), 500);
};
</script>
<style scoped lang="scss">
label {
	padding-left: 3px;
}
.tooltip {
	font-size: 0.9em;
	//text-align: right;
	color: #888;
}
.date_range {
	&-item {
		position: relative;
		input {
			width: 150px;
			height: 30px;
			border: 1px solid #888;
			border-radius: 3px;
			text-align: center;
		}
	}
	.datepicker {
		position: absolute;
		left: 0;
		top: 30px;
		z-index: 10;
	}
}
</style>
