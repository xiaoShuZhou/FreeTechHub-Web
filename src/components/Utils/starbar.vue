<template>
	<div class="starbar">
		<div class="bar"></div>
		<v-icon iconClass="star" id="star"></v-icon>
		<div class="bar"></div>
	</div>
</template>

<style scoped>
	.starbar {
		width: 80vw;
		height : 10vh;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-around;
	}
	.bar {
		width: 40%;
		height: 10%;
		background-color: white;
	}
	#star {
		height: 90%;
	}
</style>
