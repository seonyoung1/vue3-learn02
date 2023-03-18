<template>
	<h3 class="review_title">리뷰</h3>
	<TableLoading v-if="loading" />
	<div v-else-if="error" class="error review_item">{{ error }}</div>
	<div v-else class="review_list">
		<div class="review_item" v-if="data.length === 0">등록된 리뷰가 없습니다. 첫 리뷰를 작성해주세요!</div>
		<div class="review_item" v-else v-for="item in data" :key="item">
			<p class="content">{{ item.content }}</p>
			<p class="date">{{ item.created_at }}</p>
			<q-btn outline color="primary" @click="$emit('onDelete', item.id)">삭제</q-btn>
		</div>
	</div>
	<div class="review_write">
		<form class="row q-gutter-md" @submit.prevent="onSubmit">
			<textarea v-model="content" ref="inputContent"></textarea>
			<q-btn type="submit" outline color="primary">등록</q-btn>
		</form>
	</div>
</template>
<script setup>
import TableLoading from '@/components/TableLoading.vue';
import { ref } from 'vue';
defineProps({
	loading: Boolean,
	error: String,
	data: Array,
});
const emit = defineEmits(['onCreate', 'onDelete']);
const content = ref('');
const inputContent = ref(null);
const onSubmit = () => {
	if (content.value.trim() === '') {
		alert('리뷰를 입력해주세요');
		inputContent.value.focus();
		return;
	}
	emit('onCreate', content.value);
	content.value = '';
};
</script>
<style scoped lang="scss">
h3 {
	padding: 30px 0 10px;
	font-weight: bold;
}
.review_title {
	padding-bottom: 0;
}
.review_list {
	padding: 10px 0;
}
.review_item {
	display: flex;
	align-items: center;
	justify-content: space-between;
	border-top: 1px solid #ccc;
	padding: 5px 0;
	&:last-child {
		border-bottom: 1px solid #ccc;
	}
	.content {
		width: 80%;
	}
}
.review_write {
	padding-bottom: 50px;
	textarea {
		width: 500px;
		height: 50px;
		border: 1px solid #ccc;
		border-radius: 3px;
	}
}
</style>
