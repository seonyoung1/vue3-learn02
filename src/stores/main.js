import { defineStore } from 'pinia';

export const useMainStore = defineStore('main', {
	state: () => ({
		searchShown: false,
	}),
	getters: {},
	actions: {
		searchToggle() {
			this.searchShown = !this.searchShown;
		},
	},
});
