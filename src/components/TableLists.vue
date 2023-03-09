<template>
	<q-markup-table>
		<colgroup>
			<col width="40%" />
			<col width="25%" />
			<col width="20%" />
			<col width="15%" />
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
				<td class="links text-left" @click.stop="$emit('goDetail', td.id)">
					{{ td.title }}
					<span class="original">{{ td.original_title }}</span>
				</td>
				<td class="text-left">
					<TableGenre :list="td.genre_ids" />
				</td>
				<td class="text-center">
					<TableRating :point="td.vote_average" />
				</td>
				<td class="text-center">{{ td.release_date }}</td>
			</tr>
		</tbody>
	</q-markup-table>
</template>
<script setup>
import TableRating from '@/components/TableRating.vue';
import TableGenre from '@/components/TableGenre.vue';
const columns = [
	{
		name: 'title',
		required: true,
		label: '제목',
		align: 'center',
	},
	{
		name: 'genre',
		label: '장르',
		align: 'center',
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
defineProps({
	data: Array,
});
defineEmits(['goDetail']);
</script>
<style scoped lang="scss">
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
.links {
	cursor: pointer;
}
</style>
