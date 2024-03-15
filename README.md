# Ant Online Judge

## 初始化

### 安装

```bash
pro create antoj-frontend
```

```bash
yarn
```

### 移除模板

#### 移除husky

#### 移除mock

#### 移除icons与manifest.json

#### 移除cname

#### 移除国际化

```bash
yarn add eslint-config-prettier --dev yarn add eslint-plugin-unicorn --dev
```

找到node_modules / @umijs/lint/dist/config/eslint/index.js，注释掉es2022那行

执行i18n-remove命令

删除对应的文件夹locales

#### 移除单元测试

#### 移除types

#### 移除Swagger

### 运行项目

```bash
npm start
```

### Build project

```bash
npm run build
```

### Check code style

```bash
npm run lint
```

You can also use script to auto fix some lint error:

```bash
npm run lint:fix
```

### Test code

```bash
npm test
```

## More

You can view full document on our [official website](https://pro.ant.design). And welcome any feedback in
our [github](https://github.com/ant-design/ant-design-pro).
