import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useMovieStore = defineStore('movie', () => {
	const genre = ref([]);
	return { genre };
});
