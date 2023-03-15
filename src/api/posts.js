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
	post: id => review.get(`/${id}`),
	edit: (id, data) => review.patch(`/${id}`, data),
	create: (id, data) => review.post(`/${id}`, data),
};
