export default [
  {
    path: "/",
    component: "@/layouts/BasicLayout/BasicLayout",
    routes: [
      {path: '/', name: '首页', component: '@/pages/HomePage'},
      {
        path: "/user",
        name: "用户",
        routes: [
          {path: '/user/info/:id', name: '登录', component: '@/pages/User/UserInfo/UserInfoPage'},
          {path: '/user/settings', name: '登录', component: '@/pages/User/UserSettings/UserSettingsPage'},
        ]
      },
      {
        path: "/question", name: "题目", routes: [
          {
            path: "/question/content",
            name: "题目列表",
            component: '@/pages/Question/QuestionContentPage/QuestionContentPage'
          },
          {
            path: "/question/add",
            name: "题目添加",
            component: '@/pages/Question/QuestionAddPage/QuestionAddPage'
          }
        ]
      },
    ]
  },
  {
    path: "/",
    component: "@/layouts/AdminLayout/AdminLayout",
    routes: [
      {
        path: '/admin', name: '管理', routes: [
          {path: '/admin/user', name: '用户管理', component: '@/pages/Admin/AdminUser/AdminUserPage'},
          {path: '/admin/post', name: '帖子管理', component: '@/pages/Admin/AdminPost/AdminPostPage'},
          {path: '/admin/question', name: '题目管理', component: '@/pages/Admin/AdminQuestion/AdminQuestionPage'},
        ]
      },
    ]
  },
  {
    path: "/user",
    routes: [
      {path: '/user/login', name: '登录', component: '@/pages/User/UserLogin/UserLoginPage'},
      {path: '/user/register', name: '注册', component: '@/pages/User/UserRegister/UserRegisterPage'},
    ]
  },
  {path: '*', layout: false, component: './404'},
];
