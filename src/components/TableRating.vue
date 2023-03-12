<template>
	<div class="row items-center justify-center">
		<q-rating v-model="ratingModel" size="2em" readonly />
		<span class="sub">{{ point }}</span>
	</div>
</template>
<script setup>
import { computed, ref } from 'vue';
const props = defineProps({
	point: Number,
});
const number = computed(() => Math.round(props.point / 2));
const ratingModel = ref(number);
</script>
<style scoped>
.sub {
	font-size: 0.75rem;
	color: #888;
	margin-left: 10px;
}
</style>
