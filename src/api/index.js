import axios from 'axios';

export const api = axios.create({
	baseURL: 'https://api.themoviedb.org/3/',
	params: {
		api_key: '6f26edc26d6ed9d164d9bc332258be3f',
		language: 'ko',
	},
});

export const movieApi = {
	popular: (page = 1) =>
		api.get('movie/popular', {
			params: {
				page,
			},
		}),
	nowPlaying: (page = 1) =>
		api.get('movie/now_playing', {
			params: {
				page,
			},
		}),
	topRating: (page = 1) =>
		api.get('movie/top_rated', {
			params: {
				page,
			},
		}),
	discover: param =>
		api.get('discover/movie', {
			params: param,
		}),
	detail: id =>
		api.get(`movie/${id}`, {
			params: {
				append_to_response: 'videos',
			},
		}),
	genre: () => api.get('genre/movie/list'),
	search: (type, keyword, page) =>
		api.get(`search/${type}`, {
			params: {
				query: keyword,
				page,
			},
		}),
};
