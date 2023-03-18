import axios from 'axios';

export const posts = axios.create({
	baseURL: 'http://localhost:5000/posts',
});

export const postApi = {
	post: () => posts.get(''),
	edit: (id, content) => posts.patch(`/${id}`, content),
};

export const review = axios.create({
	baseURL: 'http://localhost:5000/reviews',
});

export const reviewApi = {
	post: param =>
		review.get('', {
			params: {
				...param,
			},
		}),
	edit: (id, data) => review.patch(`/${id}`, data),
	create: data => review.post('/', data),
	delete: id => review.delete(`/${id}`),
};
