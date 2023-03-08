import { ref } from 'vue';
import { movieApi } from '@/api';

export const useGenre = list => {
	const genre = ref([]);
	if (genre.value.length < 1) {
		const res = movieApi.genre();
		console.log(res);
	}
};

useGenre([27, 9648, 53]);
