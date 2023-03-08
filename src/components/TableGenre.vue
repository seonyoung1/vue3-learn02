<template>
	<div class="row">
		<template v-for="item in list" :key="item">
			<q-badge outline color="blue" :class="`item-${item}`">{{ genreValue(item) }}</q-badge>
		</template>
	</div>
</template>

<script setup>
import { useMovieStore } from '@/stores/movie';
defineProps({
	list: Array,
});
const { genreList } = useMovieStore();
const genreValue = number => {
	return genreList.filter(i => i.id === number)[0].name;
};
</script>
<style scoped>
.q-badge {
	margin-right: 5px;
	margin-bottom: 3px;
}
</style>
