<template>
	<h2 class="index_title">{{ title }}</h2>
	<div class="row q-gutter-x-md">
		<template v-for="item in data" :key="item.id">
			<RouterLink :to="`/movies/${item.id}`" class="col column">
				<div class="col images">
					<img :src="`https://image.tmdb.org/t/p/w300/${item.poster_path}`" alt="" />
				</div>
				<p class="title">{{ item.title }}</p>
			</RouterLink>
		</template>
	</div>
</template>
<script setup>
defineProps({
	data: Object,
	title: String,
});
</script>
<style scoped lang="scss">
.index_title {
	padding: 30px 0;
}
.images {
	background-color: #000;
	img {
		width: 100%;
	}
}
.title {
	background-color: #000;
	color: #fff;
	font-weight: bold;
	text-align: center;
	font-size: 1.2em;
	padding: 0.2em 0 0.4em;
	margin: 0;
}
.column {
	color: #fff;
	text-decoration: none;
	&:hover {
		color: $blue;
	}
}
</style>
