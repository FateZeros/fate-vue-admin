<template>
	<div class="v-login">
		<div class="v-login-form">
			<a-form :model="form" name="basic" autocomplete="off" @finish="onFinish">
				<a-form-item name="userName" :rules="[{ required: true, message: '用户名不能为空' }]">
					<a-input v-model:value.trim="form.userName" placeholder="用户名" />
				</a-form-item>
				<a-form-item name="password" :rules="[{ required: true, message: '密码不能为空' }]">
					<a-input-password v-model:value="form.password" placeholder="密码" />
				</a-form-item>
				<a-form-item name="remember">
					<a-checkbox v-model:checked="form.remember">记住密码</a-checkbox>
				</a-form-item>
				<a-form-item>
					<a-button type="primary" ghost html-type="submit" :loading="loading">登录</a-button>
				</a-form-item>
			</a-form>
		</div>
	</div>
</template>

<script lang="ts" src="./index.ts"></script>
<style lang="scss" src="./index.scss" scoped></style>
