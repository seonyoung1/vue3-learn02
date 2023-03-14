<template>
	<td class="links text-left">
		<input type="text" v-model="title" @blur="editContents('title')" />
		<div class="message" v-if="isTitleValid">특수문자가 들어있음</div>
	</td>
	<td class="text-left">
		<input type="text" v-model="overview" @blur="editContents('overview')" />
	</td>
	<td class="text-center">
		<input type="text" class="text-center" v-model="count" @blur="editContents('count')" />
		<div class="message" v-if="isCountValid">숫자만 입력 가능</div>
	</td>
	<td class="text-center">
		<input type="text" class="text-center" v-model="date" @blur="editContents('date')" />
		<q-popup-proxy cover transition-show="scale" transition-hide="scale">
			<q-date v-model="date" mask="YYYY-MM-DD" v-close-popup="popupClose" @update:model-value="changeValue" />
		</q-popup-proxy>
	</td>
</template>
<script setup>
import { computed, ref } from 'vue';

const props = defineProps({
	data: Object,
});
const emit = defineEmits(['editData']);

const title = ref(props.data.title);
const overview = ref(props.data.overview);
const count = ref(props.data.vote_count);
const date = ref(props.data.release_date);

const isTitleValid = computed(() => {
	const reg = /[\{\}\[\]\/?.,;|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g;
	return reg.test(title.value);
});
const isCountValid = computed(() => {
	const reg = /^[0-9]*$/;
	return !reg.test(count.value);
});

const editContents = type => {
	const id = props.data.id;
	switch (type) {
		case 'title':
			if (props.data.title === title.value || isTitleValid.value) return;
			emit('editData', id, { ...props.data, title: title.value });
			break;
		case 'overview':
			emit('editData', id, { ...props.data, overview: overview.value });
			break;
		case 'count':
			if (isCountValid.value) return;
			emit('editData', id, { ...props.data, vote_count: count.value });
			break;
		case 'date':
			emit('editData', id, { ...props.data, release_date: date.value });
			break;
		default:
			break;
	}
};
const popupClose = ref(false);
const changeValue = () => {
	popupClose.value = true;
	setTimeout(() => (popupClose.value = false), 500);
};
</script>
<style scoped lang="scss">
input {
	width: 100%;
	border: 1px solid #ccc;
	border-radius: 2px;
	height: 36px;
	padding: 0 10px;
}
.message {
	color: $red;
}
</style>
