<template>
	<h2 class="keyword_title">{{ keyword }}</h2>
	<div class="row q-gutter-x-md">
		<div class="col poster">
			<img :src="`https://image.tmdb.org/t/p/w200/${data.profile_path}`" alt="" />
		</div>
	</div>
	<div class="q-gutter-y-md">
		<h3 class="known_title">대표작</h3>
		<ul class="q-gutter-xs known_list">
			<li v-for="item in data.known_for" :key="item.id">
				<RouterLink :to="`/movies/${item.id}`">
					<div class="images"><img :src="`https://image.tmdb.org/t/p/w200/${item.poster_path}`" alt="" /></div>
					<div class="title">{{ item.title }}</div>
				</RouterLink>
			</li>
		</ul>
	</div>
</template>
<script setup>
defineProps({
	keyword: String,
	data: Object,
});
</script>
<style scoped lang="scss">
.keyword_title {
	padding: 20px 0 10px;
	font-size: 2em;
}
.known_title {
	padding: 20px 0 0;
	font-weight: bold;
}
.known_list {
	display: flex;
	li {
		width: 15%;
		padding-right: 20px;
		img {
			width: 100%;
		}
	}
	a {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		justify-content: space-between;
	}
	.title {
		color: $blue;
		text-align: center;
		font-weight: bold;
		padding-top: 10px;
	}
}
</style>
