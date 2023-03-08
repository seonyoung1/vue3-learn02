<template>
	<header class="row items-center">
		<h1>
			<q-btn to="/" flat color="primary" label="Index" />
		</h1>
		<nav>
			<q-btn-group outline>
				<q-btn to="/popular" outline label="Popular movies" />
				<q-btn to="/popular" outline label="Search" />
			</q-btn-group>
		</nav>
		<!--		<div class="links">-->
		<!--			<q-btn to="/login" flat label="Login" />-->
		<!--			<q-btn to="/signup" flat label="Sign Up" />-->
		<!--		</div>-->
	</header>
</template>
<style scoped>
h1 a {
	display: block;
}
nav {
	margin-left: 20px;
}
</style>
