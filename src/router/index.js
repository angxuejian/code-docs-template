import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';
import Navbar from './navbar.json'
const setting = require('@/setting')

const formatRouter = () => {
  const router = []
  const setData = (item) => {
    return {
      path: `/${setting.path}/${item.url}`,
      name: item.url[0].toUpperCase() + item.url.substr(1),
      component: () => import('@/views/examples/docs/' + item.url + '.md'),
    }
  }
  Navbar.forEach(item => {
    if (item.children) {
      item.children.forEach(child => {
        router.push(setData(child))
      })
    } else {
      router.push(setData(item))
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