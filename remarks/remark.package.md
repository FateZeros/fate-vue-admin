# monorepo 子包

## npm 发布

[changesets](https://pnpm.io/zh/using-changesets)


## packages 之间互相引用

在 `admin-web` 中使用 `@tiger/utils`

```bash
pnpm add @tiger/utils -D --filter admin-web 
```