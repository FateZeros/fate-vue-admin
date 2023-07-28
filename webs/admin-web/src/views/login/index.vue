<template>
	<div class="v-login">
		<div class="v-login-left">
		</div>
		<div class="v-login-right">
			<div class="v-login-right-main">
				<div class="v-login-right-main">
					<div class="v-login-right-main-title">Admin Web 欢迎您！</div>
					<div class="v-login-right-main-wrap">
						<a-tabs v-model:activeKey="activeKey">
							<a-tab-pane key="account" tab="账号登录">
								<c-account />
							</a-tab-pane>
						</a-tabs>
					</div>
				</div>

				<c-border-circle />
			</div>
		</div>
	</div>
</template>

<script lang="ts" src="./index.ts"></script>
<style lang="scss" src="./index.scss" scoped></style>
