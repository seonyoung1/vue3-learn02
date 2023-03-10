<template>
	<div class="search__wrap">
		<div class="search__inner">
			<div class="main__inner">
				<form @submit.prevent="onSubmit">
					<q-select v-model="currentSelect" :options="options" label="선택" class="form_select" ref="_select" />
					<q-input v-model="searchWord" label="검색어를 입력해주세요" class="form_input" ref="_input" />
					<q-btn type="submit" color="primary" label="검색" class="form_btn" />
				</form>
			</div>
		</div>
	</div>
	<q-dialog v-model="alert">
		<q-card style="min-width: 350px">
			<q-card-section>
				<div class="text-h6">Alert</div>
			</q-card-section>
			<q-card-section class="q-pt-none"> {{ alertMessage }} </q-card-section>
			<q-card-actions align="right">
				<q-btn flat label="OK" color="primary" v-close-popup />
			</q-card-actions>
		</q-card>
	</q-dialog>
</template>
<script setup>
import { ref } from 'vue';
import { useMainStore } from '@/stores/main';
const emit = defineEmits(['onSearchSubmit']);

const store = useMainStore();
const currentSelect = ref(null);
const searchWord = ref('');
const options = [
	{ label: '영화 제목', value: 'movie' },
	{ label: '출연 배우', value: 'person' },
];
const alert = ref(false);
const alertMessage = ref('');
const _select = ref(null);
const _input = ref(null);
const onSubmit = () => {
	if (currentSelect.value === null) {
		alert.value = true;
		alertMessage.value = '검색방법을 선택해주세요';
		_select.value.focus();
		return;
	}
	if (searchWord.value.trim() === '') {
		alert.value = true;
		alertMessage.value = '검색어를 입력해주세요';
		_input.value.focus();
		return;
	}
	store.searchShown = false;
	emit('onSearchSubmit', currentSelect.value, searchWord.value);
};
</script>
<style scoped lang="scss">
.form {
	&_select {
		width: 200px;
	}
	&_btn {
	}
	&_input {
		width: calc(100% - 200px - 100px);
	}
}
</style>
