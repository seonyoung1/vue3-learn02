<template>
	<td class="links text-left">
		{{ data.title }}
	</td>
	<td class="text-left">
		<div class="ellipsis" style="max-width: 600px">
			{{ data.overview }}
		</div>
	</td>
	<td class="text-center">
		{{ data.vote_count }}
	</td>
	<td class="text-center">
		{{ data.release_date }}
	</td>
</template>
<script setup>
defineProps({
	data: Object,
});
</script>
