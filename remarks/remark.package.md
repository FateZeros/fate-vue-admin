# monorepo 子包

## npm 发布

使用 [using-changsets](https://pnpm.io/using-changesets)

```bash
pnpm add -Dw @changesets/cli

pnpm changeset init

// 在 .changeset 文件夹下生成 markdown file
pnpm changeset

pnpm changeset version
```

查看 `npm config`

```bash
// 查看 npm 配置
npm config list
```

## packages 之间互相引用

在 `admin-web` 中使用 `@tiger/utils`

```bash
pnpm add @tiger/utils -D --filter admin-web 
```

## 遇到问题

1. Public registration is not allowed 问题

由于 `npm config` 设置不正确引起

```bash
// 旧有 配置
https://registry.npmmirror.com/

// 设置 npm config 
npm config set registry https://registry.npmjs.org/
```

2. 402 Payment Required ... You must sign up for private packages

```bash
// 配置 package.json

"publishConfig": {
	"access": "public"
}
```

3. [包名] is not in this registry

## 参考 

[npm docs](https://docs.npmjs.com/getting-started/) </br>
[changesets](https://pnpm.io/zh/using-changesets) </br>