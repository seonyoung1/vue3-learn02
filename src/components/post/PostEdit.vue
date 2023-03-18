<template>
	<td class="links text-left">
		<input type="text" v-model="title" @blur="editContents('title')" />
		<div class="message" v-if="isTitleValid">특문을 입력할 수 없습니다</div>
		<div class="message" v-if="isTitleValidBlank">제목은 공백으로 넣을 수 없습니다</div>
	</td>
	<td class="text-left">
		<input type="text" v-model="overview" @blur="editContents('overview')" />
	</td>
	<td class="text-center">
		<input type="text" class="text-center" v-model="vote_count" @input="e => onlyNumber(e.target)" @blur="editContents('vote_count')" />
	</td>
	<td class="text-center">
		<input type="text" class="text-center" v-model="release_date" @blur="editContents('release_date')" />
		<q-popup-proxy cover transition-show="scale" transition-hide="scale">
			<q-date v-model="release_date" mask="YYYY-MM-DD" v-close-popup="popupClose" @update:model-value="changeValue" />
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
const vote_count = ref(props.data.vote_count);
const release_date = ref(props.data.release_date);

const isTitleValidBlank = computed(() => {
	if (title.value === '') {
		return true;
	}
});
const isTitleValid = computed(() => {
	const reg = /[\{\}\[\]\/?.,;|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g;
	return reg.test(title.value);
});

const isCountValid = computed(() => {
	const reg = /^[0-9]*$/;
	return !reg.test(vote_count.value);
});
const onlyNumber = target => {
	target.value = target.value.replace(/[^0-9]/g, '').replace(/(\..*)\./g, '$1');
};

const editContents = type => {
	const id = props.data.id;
	switch (type) {
		case 'title':
			if (props.data.title === title.value.trim() || isTitleValid.value || isTitleValidBlank.value) return;
			emit('editData', id, { ...props.data, title: title.value });
			break;
		case 'overview':
			if (props.data.overview === overview.value.trim()) return;
			emit('editData', id, { ...props.data, overview: overview.value });
			break;
		case 'vote_count':
			if (props.data.vote_count === vote_count.value.trim() || isCountValid.value) return;
			emit('editData', id, { ...props.data, vote_count: vote_count.value });
			break;
		case 'release_date':
			if (props.data.release_date === release_date.value) return;
			emit('editData', id, { ...props.data, release_date: release_date.value });
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
