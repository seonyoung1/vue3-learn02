<template>
	<h2 class="keyword_title">{{ keyword }}</h2>
	<p class="total">총 {{ total }}개</p>
	<TableLists :data="data" @goDetail="$emit('goDetail')" />
	<div class="q-pa-lg flex flex-center">
		<q-pagination
			v-model="pages"
			@update:model-value="$emit('currentValue', pages)"
			:max="maxPage"
			:max-pages="5"
			:ellipses="false"
			:boundary-numbers="false"
			direction-links
			@click="$emit('fetchSearch')"
		/>
	</div>
</template>
<script setup>
import TableLists from '@/components/TableLists.vue';
import { computed, ref } from 'vue';

const props = defineProps({
	total: Number,
	keyword: String,
	data: Array,
	current: Number,
});
defineEmits(['goDetail', 'fetchSearch', 'currentValue']);

const pages = ref(props.current);
const maxPage = computed(() => {
	return Math.ceil(props.total / 20);
});
</script>
<style scoped>
.keyword_title {
	padding: 20px 0 10px;
	font-size: 2em;
}
.total {
	padding-bottom: 15px;
}
</style>
