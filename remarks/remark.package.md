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


## packages 之间互相引用

在 `admin-web` 中使用 `@tiger/utils`

```bash
pnpm add @tiger/utils -D --filter admin-web 
```

## 参考 

[npm docs](https://docs.npmjs.com/getting-started/) </br>
[changesets](https://pnpm.io/zh/using-changesets) </br>