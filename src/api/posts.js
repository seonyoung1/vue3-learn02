import axios from 'axios';

export const posts = axios.create({
	baseURL: 'http://localhost:5000/posts',
});
