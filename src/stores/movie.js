import { defineStore } from 'pinia';
import { movieApi } from '@/api';

export const useMovieStore = defineStore('movie', {
	state: () => ({
		genreList: [],
	}),
	getters: {},
	actions: {
		async onGenreList() {
			if (this.genreList.length > 0) return;
			const {
				data: { genres },
			} = await movieApi.genre();
			this.genreList = genres;
		},
	},
});
