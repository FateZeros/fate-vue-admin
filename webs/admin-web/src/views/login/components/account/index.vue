<template>
	<div class="c-account">
		<a-form :model="form" name="basic" autocomplete="off" @finish="onSubmit">
			<a-form-item name="userName" :rules="[{ required: true, message: '用户名不能为空' }]">
				<a-input v-model:value.trim="form.userName" placeholder="用户名" />
			</a-form-item>
			<a-form-item name="password" :rules="[{ required: true, message: '密码不能为空' }]">
				<a-input-password v-model:value="form.password" placeholder="密码" />
			</a-form-item>
			<a-form-item name="code" :rules="[{ required: true, message: '验证码不能为空' }]">
				<a-row>
					<a-col :span="15">
						<a-input v-model:value.trim="form.code" placeholder="验证码" />
					</a-col>
					<a-col :span="1"></a-col>
					<a-col :span="8">
						<img @click="getCaptchaImage" class="c-account-code-img" :src="codeImg" alt="" />
					</a-col>
				</a-row>
			</a-form-item>
			<a-form-item name="remember">
				<a-checkbox v-model:checked="form.remember">记住密码</a-checkbox>
			</a-form-item>
			<a-form-item>
				<a-button class="c-account-login-btn" type="primary" shape="round" html-type="submit" :loading="loading">登录</a-button>
			</a-form-item>
		</a-form>
	</div>
</template>

<script lang="ts" src="./index.ts"></script>
<style lang="scss" src="./index.scss" scoped></style>
