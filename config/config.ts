// https://umijs.org/config/
import {defineConfig} from '@umijs/max';
import {join} from 'path';
import proxy from './proxy';
import routes from './routes';

const {REACT_APP_ENV = 'dev'} = process.env;
export default defineConfig({
  hash: true,
  routes,
  theme: {
    'root-entry-name': 'variable',
  },
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV as keyof typeof proxy],
  fastRefresh: true,
  model: {},
  initialState: {},
  title: false,
  layout: false,
  moment2dayjs: {
    preset: 'antd',
    plugins: ['duration'],
  },
  antd: {},
  request: {},
  access: {},
  headScripts: [
    // 解决首次加载时白屏的问题
    {
      src: '/scripts/loading.js',
      async: true,
    },
  ],
  //================ pro 插件配置 =================
  presets: ['umi-presets-pro'],
  openAPI: [
    {
      requestLibPath: "import request from '@/plugins/axios'",
      schemaPath: 'http://localhost:8080/api/v2/api-docs',
      projectName: 'apis',
    },
  ],
  mfsu: {
    strategy: 'normal',
  },
  esbuildMinifyIIFE: true,
  requestRecord: {},
});
