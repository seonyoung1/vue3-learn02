<template>
	<div class="details__contents">
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
								:src="`https://www.youtube-nocookie.com/embed/${item.key}`"
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

		<ReviewContent :data="reviewData" :loading="reviewLoading" :error="reviewError" @onCreate="onCreateReviews" @onDelete="onDeleteReviews" />
	</div>
</template>
<script setup>
import TableLoading from '@/components/TableLoading.vue';
import ReviewContent from '@/components/ReviewContent.vue';
import { useRoute } from 'vue-router';
import { ref } from 'vue';
import { movieApi } from '@/api';
import { reviewApi } from '@/api/posts';
import dayjs from 'dayjs';
import { storeToRefs } from 'pinia';
import { useMainStore } from '@/stores/main';

const route = useRoute();
const id = route.params.id;

// detail data
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

// review data
const reviewData = ref([]);
const reviewLoading = ref(false);
const reviewError = ref(null);
async function fetchReview() {
	try {
		reviewLoading.value = true;
		const res = await reviewApi.post({
			media_id: id,
		});
		// console.log(res);
		reviewData.value = res.data;
	} catch (err) {
		reviewError.value = err;
	} finally {
		reviewLoading.value = false;
	}
}
fetchReview();

// review create
const { loadingShown } = storeToRefs(useMainStore());
const createError = ref(null);
const onCreateReviews = async data => {
	try {
		loadingShown.value = true;
		const contents = {
			content: data,
			created_at: dayjs().format('YYYY-MM-DD H:mm'),
			media_id: id,
		};
		const res = await reviewApi.create(contents);
		reviewData.value.push(res.data);
	} catch (err) {
		createError.value = err;
	} finally {
		loadingShown.value = false;
	}
};

// review delete
const deleteError = ref(null);
const onDeleteReviews = async id => {
	try {
		loadingShown.value = true;
		await reviewApi.delete(id);
		reviewData.value = reviewData.value.filter(item => item.id !== id);
	} catch (err) {
		deleteError.value = err;
	} finally {
		loadingShown.value = false;
	}
};
</script>
<style scoped lang="scss">
.details__contents {
	padding: 0 0 100px;
}
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
