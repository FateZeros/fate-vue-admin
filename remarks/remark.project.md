# 从零搭建 monorepo 项目

## 单项目初始化

```bash
pnpm create vite [fold-name] --template vue-ts

// 拷贝文件夹内容到指定文件夹
cp -r fold-name/ ~/
```

## 代码规范

### vscode 代码格式

1. 新建 `.vscode` 文件夹

2. eslint

新建 `.eslintrc.js`

```bash
pnpm add eslint -wD

// eslint 初始化
pnpm eslint --init
```

3. [prettier](https://prettier.io/docs/en/install.html)

新建  `.prettierignore`、`.prettierrc.js`

```bash
pnpm add prettier -w -D
```

4. stylelint

新建 `.stylelintrc.js`

```bash
pnpm add stylelint -wD

pnpm add stylelint-config-standard stylelint-config-prettier-scss stylelint-config-rational-order stylelint-config-recommended-scss stylelint-config-standard-scss stylelint-config-standard-vue stylelint-order -wD
```
### 安装 husky

[husky](https://github.com/typicode/husky)

```bash
pnpm add husky -wD

pnpm pkg set scripts.prepare="husky install"
pnpm run prepare

// 安装 lint-staged
pnpm add lint-staged -w -D

npx husky add .husky/pre-commit "pnpm lint-staged"
```
