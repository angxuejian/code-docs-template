import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';
import Navbar from './navbar.json'
const setting = require('@/setting')


/**
 * navbar.json 配置
 * 
 * [
 *  {
 *    title: string,  // 路由标题
 *    children: [ // 子路由
 *      {
 *        title: string, // 路由标题
 *        name: string,  // 路由地址名称 或 地址
 *        path: string,  // 地址
 *        link: boolean, // 是否跳转外部地址
 *      }
 *    ]
 *  },
 *  {
 *    title: string,
 *    name: string,
 *    path: string,
 *    link: boolean
 *  }
 * 
 * ]
 */
const formatRouter = () => {
  const router = []
  const setData = (item) => {
    const url = item.path || item.name 
    return {
      path: `/${setting.path}/${url}`,
      name: item.name[0].toUpperCase() + item.name.substr(1),
      component: () => import('@/views/examples/docs/' + url + '.md'),
    }
  }
  Navbar.forEach(item => {
    if (item.children) {
      item.children.forEach(child => {
        !child.link && router.push(setData(child))
      })
    } else {
      !item.link && router.push(setData(item))
    }
  })
  return router
}

const children = formatRouter()
const routes = [
  {
    path: '/',
    redirect: children[0].path,
    component: () => import('@/views/layout'),
    children: children,
  },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

export default router;