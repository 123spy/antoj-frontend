import {CheckOutlined} from "@ant-design/icons";

export default [
  {
    path: '/',
    name: "首页",
  },
  {
    path: '/question/content',
    name: '题库'
  },
  {
    path: '/question/add',
    name: '添加题目'
  },
  {
    path: "/admin",
    access: "canAdmin",
    name: "管理",
    children: [
      {
        name: '用户管理',
        path: '/admin/user',
      },
      {
        name: '帖子管理',
        path: '/admin/post',
      },
      {
        name: "题目管理",
        path: '/admin/question'
      }
    ]
  }
]
