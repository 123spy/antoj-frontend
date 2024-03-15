import {
  ChromeFilled,
  CrownFilled,
  SmileFilled,
  TabletFilled,
} from '@ant-design/icons';

/**
 * 管理布局侧边导航
 */
export default {
  route: {
    path: '/',
    routes: [
      {
        path: '/',
        name: '首页',
        icon: <SmileFilled / >,
        component: './Welcome',
      },
      {
        path: '/admin',
        name: '管理页',
        icon: <CrownFilled / >,
        access: 'canAdmin',
        component: './Admin',
        routes: [
          {
            path: '/admin/user',
            name: '用户管理',
            icon: <CrownFilled / >,
          },
          {
            path: '/admin/post',
            name: '帖子管理',
            icon: <CrownFilled / >,
          },
          {
            path: '/admin/question',
            name: '题目管理',
            icon: <CrownFilled / >,
          },
        ],
      },
    ],
  },
};
