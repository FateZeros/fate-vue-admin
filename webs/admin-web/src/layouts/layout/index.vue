<template>
	<section class="c-layout">
		<aside class="c-layout-sider"></aside>
		<section class="c-layout-main">
			<main class="c-layout-content">
				<main class="c-layout-content-main">
					<router-view> </router-view>
				</main>
			</main>
		</section>
	</section>
</template>

<script lang="ts" src="./index.ts"></script>
<style lang="scss" src="./index.scss" scoped></style>
